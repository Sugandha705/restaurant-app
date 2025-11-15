import { Schema, model } from "mongoose";

const foodSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: String,
  price: { type: Number, required: true },
  category: String,
  imageUrl: String,
  isAvailable: { type: Boolean, default: true },
 
}, { timestamps: true });

export default model('Food', foodSchema);