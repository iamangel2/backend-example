const Sequelize = require("sequelize");
const productModel = require("./product.model");

const sequelize = new Sequelize("sayur_sircle", "root", '', {
  host: "db",
  dialect: "mysql",
  port: "3306",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 0,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.product = productModel.productModel(sequelize, Sequelize);

module.exports = db;
