import Order from '../models/Order';

export default {
  Query: {
    hello: () => "hello world",
    getOrders: async (_, { store, year, month }) => {
      try {
        const orders = await Order.find({ store, year, month });
        return orders;
      } catch(e) {
        if (e) {
          console.log(e);
          return null;
        }
      }
    }
  },
  Mutation: {
    setOrder: async (_, { store }) => {
      try {
        await Order.findOneAndUpdate(
          { store },
          { $inc: { orders: 1 } },
          { new: true }
        );
      } catch(e) {
        if (e) {
          console.log(e);
          return false
        }
      }
    },
  }
}
