import Merchant from '../models/Merchant';
import User from '../models/User';
import path from 'path';
import Jimp from 'jimp';
import fs, { createWriteStream } from 'fs';

export default {
  Mutation: {
    checkDir: async (_, { storeName, isLogo, isCover, session }) => {
      let uploadDir = path.resolve(__dirname + '../../uploads/')

      const getType = () => {
        if (isLogo) {
          return 'logo/'
        } else if (isCover) {
          return 'cover/'
        } else {
          return `${session.toString()}/`
        }
      }

      const dir = !fs.existsSync(`${uploadDir}/${storeName}/${getType()}`) && fs.mkdirSync(`${uploadDir}/${storeName}/${getType()}`, { recursive: true });
      if (dir !== false) {
        return true;
      } else {
        return false
      }
    },
    uploadFile: async (_, { file, storeName, isLogo, isCover, session, type }) => {
      try {
        const { createReadStream, filename } = await file;
        let downloadPath;
        let writePath;
        let decider

        if (isLogo) {
          decider = 'logo';
        } else if (isCover) {
          decider = 'cover';
        } else {
          // decider = type + '-' + filename;
          decider = '600' + '-' + type;
        }

        if (isLogo) {
          downloadPath = path.join(__dirname, `../uploads/${storeName}/logo/`, decider);
        } else if (isCover) {
          downloadPath = path.join(__dirname, `../uploads/${storeName}/cover/`, decider);
        } else {
          downloadPath = path.join(__dirname, `../uploads/${storeName}/${session.toString()}/`, decider);
        }

        await new Promise(res => {
          createReadStream()
            .pipe(createWriteStream(downloadPath))
            .on("close", res)
        });

        if (isLogo) {
          writePath = path.join(__dirname, `../uploads/${storeName}/logo/`, decider)
        } else if (isCover) {
          writePath = path.join(__dirname, `../uploads/${storeName}/cover/`, decider)
        } else {
          writePath = path.join(__dirname, `../uploads/${storeName}/${session.toString()}/`, decider)
        };
        
        if (!isCover) {
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

        return decider;
      } catch(e) {
        console.log(e);
        return null;
      }
    },
  }
}
