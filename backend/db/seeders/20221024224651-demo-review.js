'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Reviews', [
      {
        spotId: 1,
        userId: 1,
        review: 'Excellent!',
        stars: 5
      },
      {
        spotId: 2,
        userId: 2,
        review: 'We loved every minute of our stay!',
        stars: 5
      },
      {
        spotId: 3,
        userId: 2,
        review: 'Could have been cleaner',
        stars: 3
      },
      {
        spotId: 4,
        userId: 3,
        review: 'Terrible, never again!',
        stars: 1
      },
      {
        spotId: 4,
        userId: 5,
        review: 'It was alright, a bit noisy at night',
        stars: 4
      },
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('Reviews', null, {});
  }
};
