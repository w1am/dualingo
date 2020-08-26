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
  },
  Mutation: {
    setId: async (parent, args, { client, req, res }) => {
      try {
        if (!req.session.userId) {
          let value = Math.random().toString(36).substr(2, 9) + Date.now() + Math.floor(Math.random() * 1e20);
          req.session.userId = value;
          return value;
        } else {
          return req.session.userId;
        }
      } catch(e) {
        if (e) {
          console.log(e);
          return null;
        }
      }
    }
  }
}
