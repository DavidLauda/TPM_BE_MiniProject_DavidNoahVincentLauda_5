require("dotenv").config();

const config = {
  port: process.env.PORT || 3000,
  appName: process.env.APP_NAME || "My App",
};

module.exports = config;
