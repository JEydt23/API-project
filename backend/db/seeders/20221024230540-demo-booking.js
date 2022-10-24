'use strict';

// /** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
    await queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        userId: 1,
        startDate:'2022-10-24',
        endDate: '2022-10-30'
      },
      {
        spotId: 2,
        userId: 2,
        startDate:'2022-11-01',
        endDate: '2022-11-20'
      },
      {
        spotId: 3,
        userId: 3,
        startDate:'2022-11-05',
        endDate: '2022-12-12'
      },
      {
        spotId: 4,
        userId: 4,
        startDate:'2022-12-13',
        endDate: '2022-12-15'
      },
      {
        spotId: 5,
        userId: 5,
        startDate:'2022-12-31',
        endDate: '2023-01-05'
      },
      ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('Bookings', null, {});
  }
};
