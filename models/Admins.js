module.exports = (sequelize, DataTypes) => {
    const Admins = sequelize.define("admins", {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING(72),
        allowNull: true
      },
      role: {
        type: DataTypes.TINYINT(1)
      },
    });

    return Admins;
};