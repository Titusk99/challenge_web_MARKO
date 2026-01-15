from sqlalchemy import Column, Integer, String, TIMESTAMP, text, ForeignKey, DECIMAL, Boolean
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    full_name = Column(String, nullable=True)
    role = Column(String, default="client")
    created_at = Column(TIMESTAMP, server_default=text("CURRENT_TIMESTAMP"))

    orders = relationship("Order", back_populates="user")

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String)
    price = Column(DECIMAL(10, 2), nullable=False)
    category = Column(String)
    image_url = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(TIMESTAMP, server_default=text("CURRENT_TIMESTAMP"))

    variants = relationship("ProductVariant", back_populates="product")
    order_items = relationship("OrderItem", back_populates="product")

class ProductVariant(Base):
    __tablename__ = "product_variants"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"))
    size = Column(String, nullable=False)
    stock_quantity = Column(Integer, default=0)

    product = relationship("Product", back_populates="variants")

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    total_amount = Column(DECIMAL(10, 2), nullable=False)
    status = Column(String, default="pending")
    shipping_address = Column(String, nullable=False)
    stripe_payment_id = Column(String, nullable=True)
    created_at = Column(TIMESTAMP, server_default=text("CURRENT_TIMESTAMP"))

    user = relationship("User", back_populates="orders")
    items = relationship("OrderItem", back_populates="order")

class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    product_id = Column(Integer, ForeignKey("products.id"))
    size = Column(String, nullable=False)
    quantity = Column(Integer, nullable=False)
    unit_price = Column(DECIMAL(10, 2), nullable=False)

    order = relationship("Order", back_populates="items")
    product = relationship("Product", back_populates="order_items")
