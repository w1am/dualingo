import Coupon from '../models/Coupon';

export default {
  Query: {
    hello: () => "hello world",
    getCoupons: async (_, { store }) => {
      try {
        const coupons = await Coupon.find({ store });
        return coupons;
      } catch(e) {
        if (e) {
          console.log(e);
          return false
        }
      }
    },
  },
  Mutation: {
    verifyCoupon: async (_, { store, coupon, id }) => {
      try {
        const coupon = await Coupon.findOne({ store, code: coupon });
        if (coupon) {
          const products = coupon.products;
          if (products.indexOf(id) > -1) {
            await Coupon.findOneAndUpdate({ store, code: coupon }, { $inc: { used: 1 } }, { new: true });
            return {
              ok: true,
              discount: coupon.discount
            }
          } else {
            return {
              ok: false,
              discount: null
            }
          }
        } else {
          return {
            ok: false,
            discount: null
          }
        }
      } catch(e) {
        if (e) {
          console.log(e);
          return {
            ok: false,
            discount: null
          }
        }
      }
    },
    createCoupon: async (_, { discount, code, products, store, duration }) => {
      try {
        console.log(discount, code, products, store, duration)
        const newCoupon = await Coupon.create({ code, discount, store, duration, products: JSON.parse(products) });
        await newCoupon.save();
        return true;
      } catch(e) {
        if (e) {
          console.log(e);
          return false
        }
      }
    },
  }
}
