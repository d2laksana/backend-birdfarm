'use strict';

const bcrypt = require('bcrypt');
const genApiKey = require('../helpers/genApi');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Users', [{
      name: 'Danu Dwiki Laksana',
      email: 'd2laksana.dev@gmail.com',
      password: bcrypt.hashSync('password', 14),
      role: 'admin',
      apikey: genApiKey()
    }], {});

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
