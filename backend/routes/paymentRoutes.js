
import express, { Router} from "express";
import { protect, authorize } from '../middleware/auth.js';
import { createPaymentIntent, stripeWebhook } from '../controllers/paymentController.js';

const paymentRouter = Router();


paymentRouter
    .post('/intent/:orderId', protect, createPaymentIntent) // create client secret for order payment
    .post('/stripe/webhook', express.raw({ type: 'application/json' }), stripeWebhook) // stripe webhook endpoint (should be raw body handling and verify signature)

export default paymentRouter;





/*

STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...


import express, { Router } from "express";
import { protect } from '../middleware/auth.js';
import {
  createPaymentIntent,
  stripeWebhook
} from '../controllers/paymentController.js';

const paymentRouter = Router();

// For payment creation (JSON body)
paymentRouter.post('/intent/:orderId', protect, createPaymentIntent);

// For Stripe webhooks (RAW body)
paymentRouter.post(
  '/stripe/webhook',
  express.raw({ type: 'application/json' }),
  stripeWebhook
);

export default paymentRouter;


*/