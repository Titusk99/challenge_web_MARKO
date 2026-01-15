from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from decimal import Decimal

# --- User Schemas ---
class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(UserBase):
    id: int
    role: str
    created_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

# --- Category Schemas ---
class CategoryBase(BaseModel):
    name: str
    slug: str
    gender: str
    parent_id: Optional[int] = None

class CategoryCreate(CategoryBase):
    pass

class CategoryResponse(CategoryBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# --- Product Schemas ---
class ProductBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: Decimal
    category_id: Optional[int] = None
    image_url: Optional[str] = None
    is_active: bool = True

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[Decimal] = None
    category_id: Optional[int] = None
    image_url: Optional[str] = None
    is_active: Optional[bool] = None

class ProductResponse(ProductBase):
    id: int
    created_at: datetime
    # category: Optional[CategoryResponse] = None # Uncomment if we want nested category response

    class Config:
        from_attributes = True

# --- Product Variant Schemas ---
class ProductVariantBase(BaseModel):
    size: str
    stock_quantity: int = 0

class ProductVariantCreate(ProductVariantBase):
    product_id: int

class ProductVariantResponse(ProductVariantBase):
    id: int
    product_id: int

    class Config:
        from_attributes = True

# --- Order Item Schemas ---
class OrderItemBase(BaseModel):
    product_variant_id: int
    quantity: int
    unit_price: Decimal

class OrderItemResponse(OrderItemBase):
    id: int
    # variant: Optional[ProductVariantResponse] = None # Include variant details if needed

    class Config:
        from_attributes = True

# --- Order Schemas ---
class OrderBase(BaseModel):
    total_amount: Decimal
    shipping_address: str
    stripe_payment_id: Optional[str] = None

class OrderCreate(OrderBase):
    items: List[OrderItemBase]

class OrderResponse(OrderBase):
    id: int
    user_id: int
    status: str
    created_at: datetime
    items: List[OrderItemResponse] = []

    class Config:
        from_attributes = True

# --- Favorite Schemas ---
class FavoriteBase(BaseModel):
    product_id: int

class FavoriteResponse(FavoriteBase):
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True
