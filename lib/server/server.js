require("dotenv").config({ path: "../../.env" }).parsed;
import "dotenv/config";
import express from 'express';
import path from 'path';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas";
import { startMongoose } from "./mongodb/mongoose";
import bluebird from 'bluebird';
import redis from 'redis';
import jwt from 'jsonwebtoken';
import session from 'express-session';
import crypto from 'crypto';
import uuid from 'node-uuid';

const SECRET = process.env.SECRET;
const router = express.Router();

const env = process.env.NODE_ENV || 'development';

let RedisStore = require('connect-redis')(session)
// const client = (env !== 'development')
//   ? redis.createClient()
//   : redis.createClient(process.env.REDISCLOUD_URL, { no_ready_check: true });

const redisClient = redis.createClient(process.env.REDIS_URL);

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

client.on('error', err => {
  console.log('Error ' + err);
});

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, "./schema")));
const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, "./resolvers"))
);

const app = express();

const corsOptions = {
  origin: 'http://localhost:9000',
  credentials: true,
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions));

app.use(session({
  store: new RedisStore({ client: redisClient }),
  name: 'sid',
  resave: false,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  genid: (req) => {
    return crypto.createHash('sha256').update(uuid.v1()).update(crypto.randomBytes(256)).digest("hex")
  },
  cookie: {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, 
    secure: env == 'development' ? false : true,
    sameSite: 'lax'
  }
}))

app.use(async (req, res, next) => {
  const token = req.session.token;
  if (!token) {
    return next();
  };

  try {
    const user = jwt.verify(token, SECRET);
    if ((user == {}) || !user) {
      return next()
    } else {
      req.user = user;
      return next();
    }
  } catch {}
})

// app.use((req, res, next) => {
//   console.log(req.session);
//   return next();
// })

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:9000");
  res.header("Access-Control-Allow-Headers", "Set-Cookie");
  next();
})


app.use(express.static(path.resolve(__dirname + '/../client/dist')));

if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../client/dist/index.html'));
  })
}

startMongoose();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: (env == 'development') ? {
    settings: { 'request.credentials': 'include' }
  } : false,
  context: ({ req, res }) => ({ SECRET, client, env, req, res, user: req.user, session: req.sessionID })
}).applyMiddleware({ app, cors: corsOptions, path: '/' });

module.exports = app;
