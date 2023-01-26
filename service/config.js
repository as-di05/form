require("dotenv").config();
const isSecure = process.env.IS_SECURE;
const host = process.env.INBOX_HOST;
const securePort = process.env.SECURE_PORT;
const insecurePort = process.env.INSECURE_PORT;
const port = isSecure ? securePort : insecurePort;
const account = {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASSWORD,
};

const mailConfig = {
  host,
  port,
  secure: isSecure, // true for 465, false for other ports
  auth: {
    user: account.user,
    pass: account.pass,
  },
};

module.exports = {
  mailConfig,
};
