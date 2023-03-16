'use strict';
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Users', [
      {
         fullName: 'John Doe',
         email: 'admin@sekawan.com',
         password: bcrypt.hashSync("admin", 10),
         role: "Admin"
       },
       {
        fullName: 'John Boe',
        email: 'approval@sekawan.com',
        password: bcrypt.hashSync("approval", 10),
        role: "Approval"
       },
       {
        fullName: 'John Boi',
        email: 'leader@sekawan.com',
        password: bcrypt.hashSync("leader", 10),
        role: "Leader"
       }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
