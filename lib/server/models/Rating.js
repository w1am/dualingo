import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';
var Float = require('mongoose-float').loadType(mongoose, 2);

const RatingSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
  rating: { type: Float, required: false, default: 0 },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
})

export default model('Rating', RatingSchema);
