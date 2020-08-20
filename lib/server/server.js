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

const SECRET = process.env.SECRET;
const router = express.Router();

const client = redis.createClient();

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
app.use(cors('*'));

app.use(express.static(path.resolve(__dirname + '/../client/dist')));

// if (process.env.NODE_ENV === 'production') {
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname + '/../client/dist/index.html'));
//   })
// }

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../client/dist/index.html'));
})

startMongoose();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ SECRET, client })
}).applyMiddleware({ app });

module.exports = app;
