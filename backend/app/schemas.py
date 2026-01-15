from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from decimal import Decimal

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

class ProductBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: Decimal
    category: Optional[str] = None
    image_url: Optional[str] = None
    is_active: bool = True

class ProductResponse(ProductBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class OrderItemBase(BaseModel):
    product_id: int
    size: str
    quantity: int
    unit_price: Decimal

class OrderItemResponse(OrderItemBase):
    id: int
    product: Optional[ProductResponse] = None # Include product details

    class Config:
        from_attributes = True

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
