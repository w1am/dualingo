import moment from 'moment';
import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';

var keys = ['keyboard cat']

export default {
  Query: {
    hello: async (parent, args, { client, req }) => {
      return 'Hello World'
    },
    test: async (parent, args, { client, req }) => {
      console.log(req.sessionID);
      return true
    }
  },
  Mutation: {
    test: async (parent, args, { client, req, res }) => {
      console.log('Hello World');
      res.cookie('refresh', 'Hello World');

      // req.session.fucker = 'William';
      // console.log(req.session)
      return true
    }
  }
}
