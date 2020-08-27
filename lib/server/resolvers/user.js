import User from '../models/User';
import Merchant from '../models/Merchant';
import jwt from 'jsonwebtoken';

import bcrypt from 'bcrypt';

export default {
  Query: {
    hello: () => "hello world",
    getMe: async (parent, args, { client, req, res, user }) => {
      if ((user == {}) || (user == undefined)) {
        return null;
      } else {
        return user;
      }
    },
  },
  Mutation: {
    signout: async (parent, args, { client, req, res }) => {
      req.session.destroy(err => {
        if (err) {
          console.log(err);
          return true
        }
      })
      res.clearCookie('sid');
      res.clearCookie('usr');
      return true;
    },
    updateName: async (parent, { email, name }, { client, SECRET }) => {
      try {
        const res = await User.findOneAndUpdate({ email }, { name }, { new: true });
        if (res) {
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
    resetPassword: async (parent, { email, newPassword }, { client, SECRET }) => {
      try {
        const hash = await bcrypt.hash(newPassword, 12);
        const x = await User.findOneAndUpdate({ email }, { password: hash }, { new: true });
        if (x) {
          return true
        } else {
          return false
        }
      } catch(e) {
        if (e) {
          console.log(e);
          return false;
        }
      }
    },
    refreshToken: async (parent, { email }, { client, SECRET }) => {
      try {
        const user = await User.findOne({ email });
        let stores = [];

        if (user.stores && user.stores.length >= 1) {
          for (let i=0; i<=user.stores.length-1; i++) {
            let merchant = await Merchant.findOne({ _id: user.stores[i] });
            if (merchant) {
              stores.push(merchant)
            }
          }
        }

        const token = await jwt.sign({
          id: user._id,
          name: user.name,
          email: user.email,
          stores,
          valid: user.valid
        }, SECRET);
        // await client.set('token', token);
        return {
          ok: true,
          token
        }
      } catch(e) {
        if (e) {
          console.log(e);
          return {
            ok: false,
            error: {
              message: 'Refresh token failed!'
            }
          }
        }
      }
    },
    findUser: async (parent, { email }, { client }) => {
      const currentUser = await User.findOne({ email });
      if (currentUser) {
        return {
          ok: true,
          id: currentUser._id,
          email: currentUser.email,
          name: currentUser.name
        };
      } else {
        return {
          ok: false
        };
      }
    },
    loginUser: async (parent, { email, password, save }, { SECRET, client, req }) => {
      try {
        const user = await User.findOne({ email });
        let stores = [];

        if (!user) {
          return {
            ok: false,
            error: {
              message: 'Incorrect username or password'
            }
          }
        }

        if (user.stores) {
          for (let i=0; i<=user.stores.length-1; i++) {
            const merchant = await Merchant.findOne({ _id: user.stores[i] })
            stores.push(merchant);
          }
        }
        
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
          return {
            ok: false,
            error: {
              message: 'Incorrect username or password'
            }
          }
        }

        const token = await jwt.sign({
          id: user._id,
          name: user.name,
          email: user.email,
          stores,
          valid: user.valid == undefined ? false : user.valid
        }, SECRET);

        if (save) {
          // await client.set('token', token);
          req.session.token = token;
        }

        return {
          ok: true,
          token
        }
      } catch(e) {
        if (e) {
          console.log(e);
          return {
            ok: false,
            error: {
              message: 'Something went wrong. Please try again later.'
            }
          }
        }
      }
    },
    registerUser: async (parent, args) => {
      try {
        const { email, name, password } = args;

        const user = await User.findOne({ email });
        if (user) {
          return {
            ok: false,
            error: {
              message: "User already exists"
            }
          }
        } else {
          const hash = await bcrypt.hash(password, 12);
          const newUser = await new User({ email, name, password: hash });
          await newUser.save();

          if (newUser) {
            return {
              ok: true,
              error: null
            }
          }
        }
      } catch(e) {
        if (e) {
          console.log(e);
          return {
            ok: false,
            error: {
              message: 'User registration failed. Please try again later.'
            }
          }
        }
      }
    }
  }
}
