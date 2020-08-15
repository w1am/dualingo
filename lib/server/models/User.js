import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  valid: { type: Boolean, default: false },
  stores: [{ type: Schema.Types.ObjectId, ref: 'Merchant' }],
})

export default model('User', UserSchema);
