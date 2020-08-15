import { Schema, model } from 'mongoose';
import moment from 'moment';
import mongoose from 'mongoose';

const orderid = require('order-id')('mysecret')
var Float = require('mongoose-float').loadType(mongoose, 2);

const ShipSchema = new Schema({
  customer: { type: String, default: '' },
  email: { type: String, default: '' },
  orderId: {
    type: String,
    default: () => parseInt(orderid.generate().split('-').join('')).toString()
  },
  grandTotal: { type: Float, required: false },
  grandDelivery: { type: Float, required: false },
  paymentMethod: { type: String, required: false },
  paid: { type: Boolean, default: false },
  cancelled: { type: Boolean, default: false },
  address: { type: String, default: '' },
  phone: { type: String, default: '' },
  building: { type: String, default: '' },
  instructions: { type: String, default: '' },
  purchases: [{ type: Schema.Types.ObjectId, ref: 'Purchase' }],
  valid: { type: Boolean, default: false },
  date: { type: Date, default: () => Date.now() },
  timeStamp: {
    type: String,
    default: () => moment().format('MMMM D YYYY')
  }
})

export default model('Ship', ShipSchema);
