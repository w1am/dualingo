import Merchant from '../models/Merchant';
import User from '../models/User';
import path from 'path';
import Jimp from 'jimp';
import fs, { createWriteStream } from 'fs';
const s3 = require('../s3');

export default {
  Mutation: {
    getSignature: async (_, { filename, filetype }) => {
      try {
        console.log(filename, filetype);

        const s3 = new AWS.S3({ signatureVersion: 'v4', region: 'us-east-2' })

        const s3Params = {
          Bucket: s3Bucket,
          Key: filename,
          Expires: 60,
          ContentType: filetype,
          ACL: 'public-read'
        }

        const signedRequest = await s3.getSignedUrl('putObject', s3Params);
        const url = `https://${s3Bucket}.s3.amazonaws.com/${filename}`

        return {
          signedRequest,
          url
        }
      } catch(e) {
        if (e) {
          console.log(e);
          return null;
        }
      }
    },
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
    upload: async (_, { file, storeName, isLogo, isCover, session, type }, { env }) => {
      try {
        const { createReadStream, filename, mimetype } = await file;

        if (env == 'development') {
          let downloadPath;
          let writePath;
          let decider

          if (isLogo) {
            decider = 'logo';
          } else if (isCover) {
            decider = 'cover';
          } else {
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
        } else {
          let downloadPath;
          let writePath;
          let decider

          if (isLogo) {
            decider = 'logo';
          } else if (isCover) {
            decider = 'cover';
          } else {
            decider = '600' + '-' + type;
          }

          if (isLogo) {
            downloadPath = path.join(`${storeName}/logo/`, decider);
          } else if (isCover) {
            downloadPath = path.join(`${storeName}/cover/`, decider);
          } else {
            downloadPath = path.join(`${storeName}/${session.toString()}/`, decider);
          }

          const { Location } = await s3.upload({
            Body: createReadStream(),
            Key: downloadPath,
            ContentType: mimetype
          }).promise();

          const jimpImage = await Jimp.read(Location);
          const mime = jimpImage.getMIME();
          const resizedImageBuffer = await jimpImage
            .scaleToFit(600, 600)
            .contain(600, 600)
            .background(0xFFFFFFFF)
            .getBufferAsync(mime);

          const { Location: NewLocation } = await s3.upload({
            Body: resizedImageBuffer,
            Key: downloadPath,
            ContentType: mime
          }).promise();

          if (NewLocation) {
            return decider
          } else {
            return ''
          }
        }
      } catch(e) {
        console.log(e);
        return null;
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
