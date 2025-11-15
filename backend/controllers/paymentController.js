import stripePkg from 'stripe';
import Order from '../models/Order.js';
import Payment from '../models/Payment.js';


const stripe = stripePkg(process.env.STRIPE_SECRET_KEY || '');

// Create a payment intent for an order (Stripe)
export const createPaymentIntent = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    const amount = Math.round((order.total || 0) * 100); // cents

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'eur',
      metadata: { orderId: order._id.toString() }
    });

    // create a payment record in DB
    const payment = await Payment.create({ order: order._id, amount: order.total, provider: 'stripe', providerPaymentId: paymentIntent.id, status: 'processing' });

    res.json({ clientSecret: paymentIntent.client_secret, paymentId: payment._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Payment creation failed' });
  }
};



// Webhook handler placeholder (requires proper signature verification in production)
export const stripeWebhook = async (req, res) => {
  // In production, verify stripe signature header
  const event = req.body;
  if (event.type === 'payment_intent.succeeded') {
  
    const pi = event.data.object;
    const orderId = pi.metadata?.orderId;
    try {
      const order = await Order.findById(orderId);
      if (order) {
        order.paid = true;
        await order.save();
      }
      const payment = await Payment.findOneAndUpdate({ providerPaymentId: pi.id }, { status: 'succeeded' }, { new: true });
      console.log(payment);
      console.log(orderId);
      console.log(pi);
    } catch (err) {
      console.error(err);
    }
  }
  res.json({ received: true });
};





/*

import stripePkg from 'stripe';
import Order from '../models/Order.js';
import Payment from '../models/Payment.js';

const stripe = stripePkg(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET; // REQUIRED for real webhooks

// Create a payment intent for an order (Stripe)
export const createPaymentIntent = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    const amount = Math.round(order.total * 100); // cents

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'eur',
      metadata: { orderId: order._id.toString() }
    });

    const payment = await Payment.create({
      order: order._id,
      amount: order.total,
      currency: 'eur',
      provider: 'stripe',
      providerPaymentId: paymentIntent.id,
      status: 'processing'
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentId: payment._id
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Payment creation failed' });
  }
};


// Stripe webhook handler (verified)
export const stripeWebhook = async (req, res) => {
  let event;

  try {
    // Verify signature
    const signature = req.headers['stripe-signature'];
    event = stripe.webhooks.constructEvent(
      req.body, // raw body from express.raw()
      signature,
      endpointSecret
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle payment success
  if (event.type === 'payment_intent.succeeded') {
    const pi = event.data.object;
    const orderId = pi.metadata?.orderId;

    try {
      // Update order as paid
      const order = await Order.findById(orderId);
      if (order) {
        order.paid = true;
        await order.save();
      }

      // Update payment entry
      await Payment.findOneAndUpdate(
        { providerPaymentId: pi.id },
        { status: 'succeeded' },
        { new: true }
      );

    } catch (err) {
      console.error('Webhook handling error:', err);
    }
  }

  res.json({ received: true });
};


*/




// pi_3SSwAM0LZ2zgy9660BVNHdby providerpaymentid

// {
//   "id": "evt_test_webhook",
//   "object": "event",
//   "type": "payment_intent.succeeded",
//   "data": {
//     "object": {
//       "id": "pi_test_123",
//       "object": "payment_intent",
//       "metadata": {
//         "orderId": "691599f7a0b6b560449c3cf8"
//       }
//     }
//   }
// }


/* working----- post   localhost:3000/api/payments/stripe/webhook
{
  "id": "evt_test_webhook",
  "object": "event",
  "type": "payment_intent.succeeded",
  "data": {
    "object": {
      "id": "pi_3SSwAM0LZ2zgy9660BVNHdby",
      "object": "payment_intent",
      "metadata": {
        "orderId": "691599f7a0b6b560449c3cf8"
      }
    }
  }
}
*/