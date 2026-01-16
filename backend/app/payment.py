from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
import stripe
import os
from . import models, auth, database

router = APIRouter(prefix="/payment", tags=["payment"])

# Initialize Stripe (Mock if no key)
STRIPE_SECRET_KEY = os.getenv("STRIPE_SECRET_KEY", "sk_test_mock")
stripe.api_key = STRIPE_SECRET_KEY

class PaymentIntentRequest(BaseModel):
    amount: int # In cents
    currency: str = "usd"
    payment_method_id: Optional[str] = None

@router.post("/create-payment-intent")
def create_payment_intent(
    request: PaymentIntentRequest,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(database.get_db)
):
    try:
        # If using a mock key, return a mock success response
        if STRIPE_SECRET_KEY.startswith("sk_test_mock"):
            return {
                "clientSecret": "mock_client_secret_123",
                "id": "pi_mock_123456789",
                "status": "succeeded", # Auto-succeed for mock
                "mock": True
            }

        # Real Stripe Call
        intent = stripe.PaymentIntent.create(
            amount=request.amount,
            currency=request.currency,
            payment_method=request.payment_method_id,
            confirm=True if request.payment_method_id else False,
            automatic_payment_methods={
                'enabled': True,
                'allow_redirects': 'never'
            } if request.payment_method_id else None
        )
        
        return {
            "clientSecret": intent.client_secret,
            "id": intent.id,
            "status": intent.status,
            "mock": False
        }
        
    except stripe.error.CardError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/confirm-order")
def confirm_order(
    payment_intent_id: str,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(database.get_db)
):
    # Find pending order
    order = db.query(models.Order).filter(
        models.Order.user_id == current_user.id,
        models.Order.status == "pending"
    ).first()
    
    if not order:
        raise HTTPException(status_code=404, detail="No pending order found")
        
    # Update status
    order.status = "paid"
    order.stripe_payment_id = payment_intent_id
    db.commit()
    
    return {"status": "success", "order_id": order.id}
