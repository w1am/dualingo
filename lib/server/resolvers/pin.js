import Pin from '../models/Pin';
import User from '../models/User';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

var env = process.env.NODE_ENV || 'development';

export default {
  Query: {
    hello: () => "hello world",
    getForgot: async (_, { email, password }) => {
      try {
        const pin = await Pin.findOne({ email, type: 'RESET' });
        if (pin) {
          let valid = await bcrypt.compare(password, pin.password);
          if (valid) {
            await Pin.findOneAndRemove({ email, type: 'RESET' });
            return true
          } else {
            return false
          }
        } else {
          return false
        }
      } catch(e) {
        if (e) {
          console.log(e)
          return false
        }
      }
    },
    getPin: async (_, { email, password }) => {
      try {
        const pin = await Pin.findOne({ email, type: 'CONFIRMATION' });
        if (pin) {
          let valid = await bcrypt.compare(password, pin.password);
          if (valid) {
            await Pin.findOneAndRemove({ email, type: 'CONFIRMATION' });
            await User.findOneAndUpdate({ email }, { valid: true }, { new: true });
            return true
          } else {
            return false
          }
        } else {
          return false
        }
      } catch(e) {
        if (e) {
          console.log(e)
          return false
        }
      }
    }
  },
  Mutation: {
    sendEmail: async (_, { email, password }) => {
      try {
        const hash = await bcrypt.hash(password, 12);
        
        let res = false;
        const prev = await Pin.findOne({ email, type: 'RESET' });
        if (prev) {
          const updated = await Pin.findOneAndUpdate({ email, type: 'RESET' }, { password: hash });
          if (updated) { res = true; }
        } else {
          const newPin = await new Pin({ email, password: hash, type: 'RESET' });
          await newPin.save();
          if (newPin) { res = true }
        }

        if (res) {
          let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'paylingomru@gmail.com',
              pass: 'spiderman121'
            }
          });
          
          const getLink = () => {
            if (env == 'development') {
              return '<p>Click <a href="http://localhost:9000/reset?email=' + email + '&auth=' + password + '">here</a> to reset your password</p>'

            } else {
              return '<p>Click <a href="https://paylingo.herokuapp.com/reset?email=' + email + '&auth=' + password + '">here</a> to reset your password</p>'

            }
          }

          let info = await transporter.sendMail({
            from: 'paylingomru@gmail.com',
            to: email.toLowerCase(),
            subject: "Paylingo - Reset your password",
            text: "Reset your password",
            html: getLink()
          });
        }

        return true
      } catch(e) {
        if (e) {
          console.log(e);
          return false
        }
      }
    },
    createPin: async (_, { email, password }) => {
      try {
        const hash = await bcrypt.hash(password, 12);
        
        let res = false;
        const prev = await Pin.findOne({ email, type: 'CONFIRMATION' });
        if (prev) {
          const updated = await Pin.findOneAndUpdate({ email, type: 'CONFIRMATION' }, { password: hash });
          if (updated) { res = true; }
        } else {
          const newPin = await new Pin({ email, password: hash, type: 'CONFIRMATION' });
          await newPin.save();
          if (newPin) { res = true }
        }

        if (res) {
          let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'paylingomru@gmail.com',
              pass: 'spiderman121'
            }
          });

          const getLink = () => {
            if (env == 'development') {
              return '<p>Click <a href="http://localhost:9000/verify?email=' + email + '&auth=' + password + '">here</a> to verify your account</p>'
            } else {
              return '<p>Click <a href="https://paylingo.herokuapp.com/verify?email=' + email + '&auth=' + password + '">here</a> to verify your account</p>'
            }
          }

          let info = await transporter.sendMail({
            from: 'paylingomru@gmail.com',
            to: email.toLowerCase(),
            subject: "Paylingo - Confirm your account",
            text: "Welcome to Paylingo. Please confirm your account",
            html: getLink()
          });
        }

        return true
      } catch(e) {
        if (e) {
          console.log(e);
          return false
        }
      }
    },
  }
}
