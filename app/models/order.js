'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Order.init({
    driver: DataTypes.STRING,
    statusOrder1: DataTypes.ENUM('Review','Approve','Reject'),
    statusOrder2: DataTypes.ENUM('Review','Approve','Reject'),
    jenisKendaraan: DataTypes.ENUM('Angkutan Orang', 'Angkutan Barang'),
    totalPrice: DataTypes.DECIMAL(19,4),
    createBy: DataTypes.INTEGER,
    isUpdate2: DataTypes.BOOLEAN,
    isUpdate: DataTypes.BOOLEAN,
    muatan: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};