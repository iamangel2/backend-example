function productModel(sequelize, Sequelize) {
  const Product = sequelize.define(
    "products",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );

  return Product;
}

module.exports = {
  productModel: productModel,
};
