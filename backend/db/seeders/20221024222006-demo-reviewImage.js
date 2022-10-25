'use strict';

// /** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('ReviewImages', [
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
    await queryInterface.bulkDelete('ReviewImages', null, {});
  }
};
