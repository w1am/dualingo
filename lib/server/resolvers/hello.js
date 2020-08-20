import moment from 'moment';
import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';

export default {
  Query: {
    hello: async () => {
      let uploadDir = path.resolve(__dirname + '../../uploads/')

      const dir = !fs.existsSync(`${uploadDir}/body/logo`) && fs.mkdirSync(`${uploadDir}/body/logo`, { recursive: true });

      if (dir !== false) {
        return 'eed';
      } else {
        return 'ede'
      }
    }
  },
  Mutation: {
    test: async () => {
      let uploadDir = path.resolve(__dirname + '../../uploads/body/logo')

      console.log(uploadDir)

      if (!fs.existsSync(uploadDir)){
        fs.mkdirSync(uploadDir);
      }

      // const dir = !fs.existsSync(`${uploadDir}/body/logo`) && fs.mkdirSync(`${uploadDir}/body/logo`, { recursive: true });
      //
      // console.log(dir);

      return true
    }
  }
}
