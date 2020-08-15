import { Schema, model } from 'mongoose';
import moment from 'moment';
import mongoose from 'mongoose';
var Float = require('mongoose-float').loadType(mongoose, 2);

const orderid = require('order-id')('mysecret')
var Float = require('mongoose-float').loadType(mongoose, 2);

const CouponSchema = new Schema({
  store: { type: String, required: true },

  month: { type: String, default: () => moment().format('MMMM') },
  day: { type: String, default: () => moment().format('D') },
  year: { type: String, default: () => moment().format('YYYY') },

  code: { type: String, required: true },
  discount: { type: Float, default: 0 },
  products: [{ type: Schema.Types.ObjectId, ref: 'Products' }],
  duration: { type: Number, default: 7 },
  used: { type: Number, default: 0 }
})

export default model('Coupon', CouponSchema);
