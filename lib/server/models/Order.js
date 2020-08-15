import { Schema, model } from 'mongoose';
import moment from 'moment';
import mongoose from 'mongoose';

const orderid = require('order-id')('mysecret')
var Float = require('mongoose-float').loadType(mongoose, 2);

const OrderSchema = new Schema({
  store: { type: String, required: true },
  month: { type: String, default: () => moment().format('MMMM') },
  day: { type: String, default: () => moment().format('D') },
  year: { type: String, default: () => moment().format('YYYY') },
  orders: { type: Number, default: 1 },
  sales: { type: Float, default: 0 },
})

export default model('Order', OrderSchema);
