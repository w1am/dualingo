import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';

const PinSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { type: String, required: true }
})

export default model('Pin', PinSchema);
