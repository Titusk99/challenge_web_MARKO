from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import timedelta
from typing import List

from . import models, schemas, auth, database

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from .database import get_db

@app.get("/")
def read_root():
    return {"message": "Hello World from Docker!"}

@app.post("/auth/register", response_model=schemas.UserResponse)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = auth.get_password_hash(user.password)
    new_user = models.User(
        email=user.email,
        password_hash=hashed_password,
        full_name=user.full_name
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.post("/auth/login", response_model=schemas.Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == form_data.username).first()
    if not user or not auth.verify_password(form_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/users/me", response_model=schemas.UserResponse)
def read_users_me(current_user: models.User = Depends(auth.get_current_user)):
    return current_user

@app.get("/users/me/orders", response_model=List[schemas.OrderResponse])
def read_users_orders(current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(get_db)):
    orders = db.query(models.Order).filter(models.Order.user_id == current_user.id).all()
    return orders

@app.put("/users/me", response_model=schemas.UserResponse)
def update_user_me(user_update: schemas.UserUpdate, current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(get_db)):
    if user_update.email and user_update.email != current_user.email:
        # Check if email is taken
        existing_user = db.query(models.User).filter(models.User.email == user_update.email).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")
        current_user.email = user_update.email
    
    if user_update.full_name:
        current_user.full_name = user_update.full_name
        
    if user_update.password:
        current_user.password_hash = auth.get_password_hash(user_update.password)
        
    try:
        db.commit()
        db.refresh(current_user)
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Update failed: {str(e)}")
    
    return current_user

# --- Address Endpoints ---

@app.get("/users/me/addresses", response_model=List[schemas.AddressResponse])
def read_user_addresses(current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(get_db)):
    return current_user.addresses

@app.post("/users/me/addresses", response_model=schemas.AddressResponse)
def create_address(address: schemas.AddressCreate, current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(get_db)):
    print(f"DEBUG: Creating address {address} for user {current_user.id}")
    db_address = models.Address(**address.dict(), user_id=current_user.id)
    db.add(db_address)
    db.commit()
    db.refresh(db_address)
    return db_address

@app.put("/users/me/addresses/{address_id}", response_model=schemas.AddressResponse)
def update_address(address_id: int, address_update: schemas.AddressCreate, current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(get_db)):
    db_address = db.query(models.Address).filter(models.Address.id == address_id, models.Address.user_id == current_user.id).first()
    if not db_address:
         raise HTTPException(status_code=404, detail="Address not found")
    
    for key, value in address_update.dict().items():
        setattr(db_address, key, value)
        
    db.commit()
    db.refresh(db_address)
    return db_address

@app.delete("/users/me/addresses/{address_id}")
def delete_address(address_id: int, current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(get_db)):
    db_address = db.query(models.Address).filter(models.Address.id == address_id, models.Address.user_id == current_user.id).first()
    if not db_address:
         raise HTTPException(status_code=404, detail="Address not found")
    
    db.delete(db_address)
    db.commit()
    return {"message": "Address deleted"}

### ADMIN ROUTES ###

@app.get("/admin/products", response_model=List[schemas.ProductResponse])
def get_products(db: Session = Depends(get_db)):
    # Optionally open for public but typically admin manages it.
    # For now, let's keep it open or admin? 
    # The requirement says "Public Product List" uses GET /products.
    # So this is specifically for admin dashboard table, usually same as public but with more info (active status etc).
    # Since we don't have separate public/admin product models yet, we reuse.
    return db.query(models.Product).all()

@app.post("/admin/products", response_model=schemas.ProductResponse)
def create_product(
    product: schemas.ProductCreate, 
    db: Session = Depends(get_db), 
    current_user: models.User = Depends(auth.get_current_admin_user)
):
    db_product = models.Product(**product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

@app.put("/admin/products/{product_id}", response_model=schemas.ProductResponse)
def update_product(
    product_id: int, 
    product: schemas.ProductUpdate, 
    db: Session = Depends(get_db), 
    current_user: models.User = Depends(auth.get_current_admin_user)
):
    db_product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    update_data = product.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_product, key, value)
    
    db.commit()
    db.refresh(db_product)
    return db_product

    db.delete(db_product)
    db.commit()
    return None

### PUBLIC PRODUCT ROUTES ###

@app.get("/products", response_model=List[schemas.ProductResponse])
def get_public_products(category: str = None, db: Session = Depends(get_db)):
    query = db.query(models.Product).filter(models.Product.is_active == True)
    if category:
        query = query.join(models.Category).filter(models.Category.slug == category)
    return query.all()

@app.get("/products/{product_id}", response_model=schemas.ProductResponse)
def get_public_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(models.Product).filter(models.Product.id == product_id, models.Product.is_active == True).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

