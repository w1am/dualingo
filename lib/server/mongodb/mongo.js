require('dotenv').config({path: '../../.env'}).parsed;

export default {
  "dbuser": process.env.DB_USER,
  "dbpassword": process.env.DB_PASSWORD,
  "hostname": process.env.DB_HOSTNAME,
  "port": process.env.DB_PORT,
  "name": process.env.DB_NAME
}
