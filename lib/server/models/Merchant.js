import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';
var Float = require('mongoose-float').loadType(mongoose, 2);

const MerchantSchema = new Schema({
  companyName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  logo: { type: String, required: false },
  verified: { type: Boolean, required: false },
  maintainer: { type: Schema.Types.ObjectId, ref: 'User' },
  vatRegistered: { type: Boolean, required: false },
  delivery: { type: Boolean, default: false },
  deliveryFee: { type: Float, default: 0 },
  pages: {
    type: Array,
    default: ['Latest']
  },
  category: { type: String, required: true },
  sales: { type: Number, required: false, default: 0 },
  locations: {
    type: Array,
    default: []
  },
  methods: {
    type: Array,
    default: []
  }
})

export default model('Merchant', MerchantSchema);
