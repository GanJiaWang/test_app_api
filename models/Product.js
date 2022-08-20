module.exports = (sequelize, DataTypes) => {
    const Products = sequelize.define("products", {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      description: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      category: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      price: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: true
      },
    });

    return Products;
};