import Merchant from '../models/Merchant';
import User from '../models/User';
import Ship from '../models/Ship';
import path from 'path';
import Jimp from 'jimp';
import fs, { createWriteStream } from 'fs';

const s3 = require('../s3');

export default {
  Query: {
    hello: () => "hello world",
    getAccounts: async (_, { orderId }) => {
      try {
        let accounts = [];
        let ships = await Ship.findOne({ orderId }).populate({ path: 'purchases', model: 'Purchase' });
        let purchases = ships.purchases;

        const findTotal = (items) => {
          let total = 0;
          items.map(item => total += parseFloat(item.subTotal));
          return total;
        }

        for (let i=0; i<=purchases.length-1; i++) {
          let merchant = await Merchant.findOne({ username: purchases[i].storeName });
          accounts.push({
            storeName: purchases[i].storeName,
            account: merchant.methods,
            subTotal: findTotal(purchases[i].items)
          })
        }
        return accounts
      } catch(e) {
        if (e) {
          console.log(e);
          return null
        }
      }
    },
    getLocations: async (_, { storeName }) => {
      try {
        let merchant = await Merchant.findOne({ username: storeName });
        return merchant.locations;
      } catch(e) {
        if (e) {
          console.log(e);
          return null
        }
      }
    },
    getMerchants: async (_, { limit }) => {
      try {
        let merchants = await Merchant.find({}).limit(limit).sort([[ 'sales', -1 ]]);
        return merchants;
      } catch(e) {
        if (e) {
          console.log(e);
          return null
        }
      }
    },
    getSettings: async (parent, { storeName }) => {
      try {
        let merchant = await Merchant.findOne({ username: storeName });
        return {
          delivery: merchant.delivery,
          deliveryFee: merchant.deliveryFee,
          methods: merchant.methods
        }
      } catch(e) {
        if (e) {
          console.log(e);
          return null
        }
      }
    },
    findCurrentMerchant: async (parent, args) => {
      try {
        const merchant = await Merchant.findOne({ username: args.username });
        return merchant;
      } catch(e) {
        if (e) {
          console.log(e);
          return null
        }
      }
    }
  },
  Mutation: {
    saveLocations: async (parent, { storeName, locations }) => {
      try {
        let updated = await Merchant.findOneAndUpdate({ username: storeName }, {
          locations: JSON.parse(locations)
        }, { new: true });
        if (updated) {
          return true;
        } else {
          return false;
        }
      } catch(e) {
        if (e) {
          console.log(e);
          return false;
        }
      }
    },
    saveSettings: async (parent, { storeName, delivery, deliveryFee, methods, logo }, { env }) => {
      try {
        if ((typeof logo !== 'string') && (typeof logo == 'object')) {
          const { createReadStream, filename, mimetype } = await logo;

          let downloadPath;
          if (env !== 'development') {
            downloadPath = path.join(`${storeName}/logo/`, 'logo');

            const { Location } = await s3.upload({
              Body: createReadStream(),               
              Key: downloadPath,
              ContentType: mimetype                   
            }).promise();
          } else {
            downloadPath = path.join(__dirname, `../uploads/${storeName}/logo/`, 'logo');

            await new Promise(res => {
              createReadStream()
                .pipe(createWriteStream(downloadPath))
                .on("close", res)
            });

            let writePath = path.join(__dirname, `../uploads/${storeName}/logo/`, 'logo')

            Jimp.read(downloadPath, (err, lenna) => {
              if (err) throw err;
              lenna
                .resize(600, Jimp.AUTO)
                .contain(600, 600)
                .background(0xFFFFFFFF)
                .quality(60)
                .write(writePath);
            });
          }
        }

        let updated = await Merchant.findOneAndUpdate({ username: storeName }, {
          delivery,
          deliveryFee,
          methods: JSON.parse(methods),
          logo: 'logo'
        }, { new: true });

        if (updated) {
          return true;
        } else {
          return false;
        }
      } catch(e) {
        if (e) {
          console.log(e);
          return false;
        }
      }
    },
    registerMerchant: async (parent, args, { env }) => {
      try {
        const { companyName, username, address, logo, maintainer, vatRegistered, category } = args;

        const curretUser = await User.findOne({ email: maintainer });

        const newMerchant = await new Merchant({
          companyName,
          username,
          address,
          logo: 'logo',
          maintainer: curretUser._id,
          vatRegistered,
          category
        });
        await newMerchant.save();

        if (newMerchant) {
          await User.findOneAndUpdate({ email: maintainer }, { $push: { stores: newMerchant._id } }, { new: true });

          const { createReadStream, filename, mimetype } = await logo;

          let downloadPath;

          if (env !== 'development') {
            downloadPath = path.join(`${username}/logo/`, 'logo');

            const { Location } = await s3.upload({
              Body: createReadStream(),
              Key: downloadPath,
              ContentType: mimetype
            }).promise();
          } else {
            downloadPath = path.join(__dirname, `../uploads/${username}/logo/`, 'logo');

            let uploadDir = path.resolve(__dirname + '../../uploads/')
            const dir = !fs.existsSync(`${uploadDir}/${username}/logo`) && fs.mkdirSync(`${uploadDir}/${username}/logo`, { recursive: true });

            await new Promise(res => {
              createReadStream()
                .pipe(createWriteStream(downloadPath))
                .on("close", res)
            });

            Jimp.read(downloadPath, (err, lenna) => {
              if (err) throw err;
              lenna
                .resize(600, Jimp.AUTO)
                .contain(600, 600)
                .background(0xFFFFFFFF)
                .quality(60)
                .write(downloadPath);
            });
          }

          return {
            ok: true,
            error: null
          }
        }
      } catch(e) {
        if (e) {
          console.log(e);
          return {
            ok: false,
            error: {
              message: 'Merchant registration failed. Please try again later.'
            }
          }
        }
      }
    }
  }
}
