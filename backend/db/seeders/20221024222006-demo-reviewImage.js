'use strict';

// /** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    /**
     * Add seed commands here.
     *
     * Example:
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: 'test11.png'
      },
      {
        reviewId: 2,
        url: 'test22.com'
      },
      {
        reviewId: 3,
        url: 'test33.png'
      },
      {
        reviewId: 4,
        url: 'test44.jpeg'
      },
      {
        reviewId: 5,
        url: 'test55.com'
      },

    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    options.tableName = 'ReviewImages';
    await queryInterface.bulkDelete(options, null, {});
  }
};
