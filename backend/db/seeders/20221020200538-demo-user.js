'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        firstName: 'Daniel',
        lastName: 'Jones',
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Saquon',
        lastName: 'Barkley',
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Xavier',
        lastName: 'McKinney',
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // const Op = Sequelize.Op;
    options.tableName = 'Users'
    return queryInterface.bulkDelete(options);
  }
};
