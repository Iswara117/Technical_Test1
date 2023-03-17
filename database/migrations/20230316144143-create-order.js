'use strict';

const { sequelize } = require('../../app/models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderDate: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.fn('NOW')
      },
      totalPrice :{
        type: Sequelize.DECIMAL(19, 4)
      },
      driver :{
        type: Sequelize.STRING
      },
      statusOrder1:{
        type: Sequelize.ENUM("Review", "Approve", "Reject"),
        defaultValue: 'Review'
      },
      statusOrder2:{
        type: Sequelize.ENUM("Review", "Approve", "Reject"),
      },
      jenisKendaraan:{
        type: Sequelize.DataTypes.ENUM("Angkutan Orang", "Angkutan Barang"),
      },
      muatan:{
        type: Sequelize.DataTypes.INTEGER,
      },
      createBy :{
        type: Sequelize.INTEGER
      },
      isUpdate :{
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      isUpdate2 :{
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};