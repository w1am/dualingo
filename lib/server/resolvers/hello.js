import moment from 'moment';
import nodemailer from 'nodemailer';

export default {
  Query: {
    hello: async () => {
      return 'hello world'
    }
  },
  Mutation: {
    test: async () => {
      let testAccount = await nodemailer.createTestAccount();

      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'paylingomru@gmail.com',
          pass: 'spiderman121' // naturally, replace both with your real credentials or an application-specific password
        }
      });

      let info = await transporter.sendMail({
        from: 'paylingomru@gmail.com', // sender address
        to: "william@inorbit.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });

      return true
    }
  }
}
