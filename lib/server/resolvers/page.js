import Merchant from '../models/Merchant';
import Product from '../models/Product';

export default {
  Query: {
    getPages: async (_, { storeId }) => {
      try {
        const store = await Merchant.findOne({ _id: storeId });
        return store.pages;
      } catch(e) {
        console.log(e)
        return {
          ok: false,
        }
      }
    },
  },
  Mutation: {
    createPage: async (_, { page, storeName }) => {
      try {
        const currentStore = await Merchant
          .findOne({ username: storeName });
        currentStore.pages.push(page.toString());
        await currentStore.save();
        return true
      } catch(e) {
        console.log(e);
        return false
      }
    },
    updatePage: async (_, { productId, page }) => {
      console.log(productId, page);
      try {
        await Product.findOneAndUpdate({ _id: productId }, { page }, { new: true });
        return true;
      } catch(e) {
        console.log(e);
        return false;
      }
    },
  }
}
