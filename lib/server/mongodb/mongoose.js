import mongoose from 'mongoose';
import uri from './mongo';

const db = `mongodb://${uri.dbuser}:${uri.dbpassword}@${uri.hostname}:${uri.port}/${uri.name}`;

export const startMongoose = () => {
  mongoose.set('useFindAndModify', false);
  mongoose.connect(
    db,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    },
    (err, res) => {
      if (err) {
        console.log('mongodb failed to connect');
        console.log(err);
      } else {
        console.log('connection successful');
      }
    }
  )
}
