import Product from '../models/Product';
import Purchase from '../models/Purchase';
import Merchant from '../models/Merchant';
import jwt from 'jsonwebtoken';

import bcrypt from 'bcrypt';

export default {
  Query: {
    hello: () => "hello world",
    getProductByCategory: async (_, { category, limit, page }) => {
      try {
        let query = {};
        if (category) {
          query = { categories: category }
        } else {
          query = {}
        };

        const prod = await Product.find({ ...query, deleted: false });
        let len = prod.length;

        const products = await Product
          .find({ ...query, deleted: false }).sort([[ 'views', -1 ]])
          .populate({ path: 'store', model: 'Merchant' })
          .limit(limit)
          .skip(parseInt(page - 1) * limit)
        return {
          products,
          len
        };
      } catch(e) {
        if (e) {
          console.log(e);
          return null;
        }
      }
    },
    getProduct: async (_, { id }) => {
      const product = await Product.findOne({ _id: id, deleted: false }).populate({ path: 'store', model: 'Merchant' });
      return product;
    },
    filterProduct: async (_, args) => {
      const { search = null, page = 1, limit = 12, option, rating } = args;
      let searchQuery = {};
      if (search == null || search == '') {
        return null
      }
      let final = {};

      if (search) {
        searchQuery = {
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { 'options.name': { $regex: search, $options: 'i' } },
            { categories: { $regex: search, $options: 'i' } },
            { storeName: { $regex: search, $options: 'i' } },
            { name: { $regex: search, $options: 'i' } },
          ]
        }
      };

      if (option) {
        switch(option) {
          case 0:
            final = { ...searchQuery, price: { $gte: 50, $lte: 500 } }
            break;
          case 1:
            final = { ...searchQuery, price: { $gte: 500, $lte: 2000 } }
            break;
          case 2:
            final = { ...searchQuery, price: { $gte: 2000, $lte: 5000 } }
            break;
          case 3:
            final = { ...searchQuery, price: { $gte: 5000 } }
            break;
          default: null
        }
      } else {
        final = searchQuery
      }

      const products = await Product
        .find(rating ? { ...final, rating: { $gte: rating }, deleted: false } : { ...final, deleted: false })
        .populate({
          path: 'store',
          model: 'Merchant'
        })
        .limit(limit)
        .skip(parseInt(page - 1) * limit)
      return products
    },
    storeProducts: async (_, { storeName, page, filter, tab, limit }) => {
      const store = await Merchant.findOne({ username: storeName });
      let searchQuery = {};

      if (filter) {
        searchQuery = {
          $or: [
            { title: { $regex: filter, $options: 'i' } },
            { categories: { $regex: filter, $options: 'i' } }
          ]
        }
      };

      const prod = await Product.find({ store: store._id, deleted: false });
      let len = prod.length;

      if (page) {
        if (store.pages.indexOf(page) < 0 && page !== 'All') {
          return null
        }
        if (page == 'All') {
          const products = await Product
            .find({ store: store._id, ...searchQuery, deleted: false })
            .populate({
              path: 'store',
              model: 'Merchant'
            })
            .sort([[ 'timeStamp', -1 ]])
            .limit(limit)
            .skip(parseInt(tab - 1) * limit)
          return { products, len }
        } else {
          const products = await Product
            .find({ store: store._id, page, ...searchQuery, deleted: false })
            .populate({
              path: 'store',
              model: 'Merchant'
            })
            .sort([[ 'timeStamp', -1 ]])
            .limit(limit)
            .skip(parseInt(tab - 1) * limit)
          return { products, len }
        }
      } else {
        const products = await Product
          .find({ store: store._id, ...searchQuery, deleted: false })
          .populate({
            path: 'store',
            model: 'Merchant'
          })
          .sort([[ 'timeStamp', -1 ]])
          .limit(limit)
          .skip(parseInt(tab - 1) * limit)

        return { products, len }
      }
    },
  },
  Mutation: {
    incViews: async (_, { id }) => {
      try {
        let product = await Product.findOneAndUpdate({ _id: id }, { $inc: { views: 1 } }, { new: true });
        return true
      } catch(e) {
        if (e) {
          return false
        }
      }
    },
    deleteProduct: async (_, { id }) => {
      try {
        let product = await Product.findOneAndUpdate({ _id: id }, { deleted: true }, { new: true });
        await Purchase.updateOne({ 'items.itemId': id }, { '$set': {
          'items.$.deleted': true
        }})
        return true
      } catch(e) {
        if (e) {
          return false
        }
      }
    },
    updateDescription: async (_, { id, description }) => {
      try {
        let product = await Product.findOneAndUpdate({ _id: id }, { description }, { new: true });
        return true
      } catch(e) {
        if (e) {
          return false
        }
      }
    },
    generateTrends: async (_, { keywords }) => {
      try {
        let searchQuery = {};
        searchQuery = {
          $or: [
            { categories: { $regex: keywords, $options: 'i' } },
          ]
        }
        let products = await Product
          .find({ ...searchQuery, deleted: false })
          .populate({ path: 'store', model: 'Merchant' });
        return {
          products
        }
      } catch(e) {
        if (e) {
          return false
        }
      }
    },
    checkStock: async (_, { productId, selectedOption, selectedCount }) => {
      try {
        let currentProduct = await Product.findOne({ _id: productId });
        let res;
        if (selectedOption && selectedOption.length >= 1) {
          const currentOptions = currentProduct.options;
          currentOptions.map(option => {
            if (option.name == selectedOption) {
              if (option.quantity - selectedCount >= 0) {
                res = true
              } else {
                res = false
              }
            }
          })
        } else {
          if (currentProduct.quantity - selectedCount >= 0) {
            res = true
          } else {
            res = false
          }
        }
        return res;
      } catch(e) {
        if (e) {
          console.log(e);
          return false;
        }
      }
    },
    createProduct: async (parent, {
      title,
      price,
      previousPrice,
      discount,
      quantity,
      addedVAT,
      fileUrl,
      options,
      addOptionTitle,
      addOptions,
      storeName,
      purchaseLimit,
      category,
      hasEdit,
      productId,
      page,
      session
    }) => {
      try {
        let storeOptions = JSON.parse(options);
        let userAddOptions = JSON.parse(addOptions);

        let categories = category.split(',');
        let currentStore = await Merchant.findOne({ username: storeName });

        if (hasEdit) {
          let updatedCategories = [];
          let updatedOptions = [];
          let updatedAddOptions = [];
          let updatedLowestPrice = 0;
          let updatedHighestPrice = 0;
          categories.forEach(cat => updatedCategories.push(cat));

          if (userAddOptions.length >= 1) {
            userAddOptions.map(async option => {
              updatedAddOptions.push({ name: option.name, price: option.price });
            })
          }

          if (storeOptions.length >= 1) {
            storeOptions.map(async (option, index) => {
              updatedOptions.push({
                name: option.name,
                price: option.price,
                previousPrice: option.previousPrice,
                discount: option.discount,
                addedVAT: option.addedVAT,
                quantity: option.quantity,
                fileUrl: JSON.parse(option.fileUrl),
              });
            });
          }
          let updatedProduct = {
            quantity,
            categories: updatedCategories,
            title,
            price,
            previousPrice,
            discount,
            addedVAT,
            fileUrl: JSON.parse(fileUrl),
            store: currentStore._id,
            purchaseLimit,
            options: updatedOptions,
            addOptionTitle,
            addOptions: updatedAddOptions,
            highestPrice: updatedHighestPrice,
            lowestPrice: updatedLowestPrice,
            page,
            session,
            storeName,
            name: currentStore.companyName
          };
          await Product.findOneAndUpdate({ _id: productId }, updatedProduct, { new: true });

          return {
            ok: true,
            id: productId
          }
        } else {
          let newProduct = await Product.create({
            title,
            price,
            previousPrice,
            discount,
            quantity,
            addedVAT,
            addOptionTitle,
            store: currentStore._id,
            fileUrl: JSON.parse(fileUrl),
            purchaseLimit,
            page,
            session,
            storeName,
            name: currentStore.companyName
          });

          if (userAddOptions.length >= 1) {
            userAddOptions.map(option => newProduct.addOptions.push({ name: option.name, price: option.price }) )
          }

          if (storeOptions.length >= 1) {
            storeOptions.map(option => { 
              newProduct.options.push({
                name: option.name,
                price: option.price,
                previousPrice: option.previousPrice,
                discount: option.discount,
                addedVAT: option.addedVAT,
                quantity: option.quantity,
                fileUrl: JSON.parse(option.fileUrl)
              });
            });
          }
          categories.forEach(async cat => {
            newProduct.categories.push(cat)
          });

          newProduct.save();

          return {
            ok: true,
            id: newProduct._id
          }
        }

      } catch(e) {
        if (e) {
          console.log(e);
          return {
            ok: false
          }
        }
      }
    },
  }
}
