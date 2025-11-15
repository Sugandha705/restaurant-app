
import {Schema, model} from "mongoose";

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  table: { type: Schema.Types.ObjectId, ref: 'Table' },
  items: [
    {
      name: String,
      food: { type: Schema.Types.ObjectId, ref: 'Food' },
      price: Number, //optional
      quantity: { type: Number, default: 1 }
    }
  ],
  total: { type: Number, required: true },
  status: { type: String, enum: ['pending','preparing','served','cancelled','completed'], default: 'pending' },
  paid: { type: Boolean, default: false }
  
}, {timestamps:true});

export default model('Order', orderSchema);



