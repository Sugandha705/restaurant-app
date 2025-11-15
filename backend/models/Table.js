import {Schema, model} from "mongoose";

const tableSchema = new Schema({
  number: { type: Number, required: true, unique: true },
  seats: { type: Number, required: true },
  status: { type: String, enum: ['available', 'reserved', 'occupied', 'unavailable'], default: 'available' },
  notes: { type: String }

}, {timestamps:true});

export default model('Table', tableSchema);
