function catalogModel(sequelize, Sequelize) {
    const Catalog = sequelize.define(
      "catalog",
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        type: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        desc: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        price: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        rebate: {
          type: Sequelize.STRING(10),
          allowNull: true,
        },
        photo: {
            type: Sequelize.STRING,
            allowNull: false,
        }
      },
      {
        freezeTableName: true,
      }
    );
  
    return Catalog;
  }
  
  module.exports = {
    catalogModel: catalogModel,
  };
