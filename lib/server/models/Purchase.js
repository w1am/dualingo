import { Schema, model } from 'mongoose';
import moment from 'moment';
import mongoose from 'mongoose';
var Float = require('mongoose-float').loadType(mongoose, 2);

const PurchaseSchema = new Schema({
  storeName: { type: String, required: false },
  name: { type: String, required: false },
  delivery: { type: Boolean, required: false },
  deliveryFee: { type: Float, required: false },
  ship: { type: Schema.Types.ObjectId, ref: 'Ship' },
  valid: { type: Boolean, default: false },
  received: { type: Boolean, default: false },
  date: { type: Date, default: () => Date.now() },
  cancelled: { type: Boolean, default: false },
  timeStamp: {
    type: String,
    default: () => moment().format('MMMM D YYYY')
  },
  items: [{
    identifier: String,
    addOption: String,
    option: String,
    count: Number,
    fileUrl: String,
    itemId: String,
    price: Float,
    rating: { type: Float, default: 0 },
    quantity: Number,
    deleted: false,
    session: String,
    subTotal: Float,
    title: String,
  }]
})

export default model('Purchase', PurchaseSchema);
