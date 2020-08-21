import Merchant from '../models/Merchant';
import User from '../models/User';
import path from 'path';
import Jimp from 'jimp';
import fs, { createWriteStream } from 'fs';
import AWS from 'aws-sdk';

const BUCKET_NAME = process.env.BUCKET_NAME;
const IAM_USER_KEY = process.env.IAM_USER_KEY;
const IAM_USER_SECRET = process.env.IAM_USER_SECRET;

const S3_BUCKET = process.env.S3_BUCKET;

const uploadToS3 = async (file, name) => {
  const { createReadStream } = await file;
  let s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
    Bucket: BUCKET_NAME
  });
  s3bucket.createBucket(function () {
      var params = {
        Bucket: BUCKET_NAME,
        Key: name,
        Body: createReadStream()
      };
      s3bucket.upload(params, function (err, data) {
        if (err) {
          console.log(err);
        }
        return true;
      });
  });
}

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

          let s3bucket = new AWS.S3({
            accessKeyId: IAM_USER_KEY,
            secretAccessKey: IAM_USER_SECRET,
            Bucket: BUCKET_NAME
          });

          let res = false;

          await s3bucket.createBucket(async function () {
            var params = { Bucket: BUCKET_NAME, Key: downloadPath, Body: createReadStream() };
            await s3bucket.upload(params, function (err, data) {
              if (err) {
                console.log(err)
                res = false
              } else {
                res = true
                console.log('success');
              }
            });
          });

          if (res) {
            return decider
          } else {
            return null
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
