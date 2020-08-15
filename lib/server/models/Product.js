import { Schema, model } from 'mongoose';
import moment from 'moment';
import mongoose from 'mongoose';
var Float = require('mongoose-float').loadType(mongoose, 2);

const ProductSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Float, required: true },
  previousPrice: { type: Float, required: false },
  discount: { type: Float, required: false },
  quantity: { type: Number, default: 0  },
  addedVAT: { type: Float, required: false },
  description: { type: String, default: '' },
  sales: { type: Number, default: 0 },
  lastUpdated: { type: String, default: () => moment().format('MMMM YYYY') },
  fileUrl: [{ type: String, required: false }],
  views: { type: Number, default: 0  },
  options: [{
    name: String,
    price: Float,
    previousPrice: Float,
    discount: Float,
    addedVAT: Float,
    quantity: Number,
    fileUrl: String
  }],
  addOptionTitle: { type: String, required: false },
  addOptions: [{ name: String, price: Float }],
  store: { type: Schema.Types.ObjectId, ref: 'Store' },
  purchaseLimit: { type: Number, required: true },
  published: { type: Boolean, default: false },
  deleted: { type: Boolean, default: false },
  categories: [String],
  timeStamp: {
    type: String,
    default: () => moment().format('MMMM D')
  },
  page: { type: String, required: false },
  session: { type: String, required: false },
  storeName: { type: String, required: false },
  name: { type: String, required: false },
  rating: { type: Float, required: false, default: 0 },
  ratingCount: { type: Number, required: false, default: 0 }
})

export default model('Product', ProductSchema);
