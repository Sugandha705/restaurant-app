
import {Schema, model} from "mongoose";

const paymentSchema = new Schema({
  order: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'eur' },
  provider: { type: String, enum: ['stripe', 'manual'], default: 'stripe' },
  providerPaymentId: String,
  status: { type: String, enum: ['processing','succeeded','failed','refunded'], default: 'processing' }
  
}, {timestamps:true});

export default model('Payment', paymentSchema);




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


post    localhost:3000/api/payments/intent/69146555a250e2d490116805  (orderid)

{
 
"amount": 5
}
*/