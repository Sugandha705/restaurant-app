import {Schema, model} from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'staff', 'admin'], default: 'customer' },
  //createdAt: { type: Date, default: Date.now }
}, {timestamps:true});

export default model('User', userSchema);