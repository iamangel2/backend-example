require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "passport_swift_analytics_dev",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
