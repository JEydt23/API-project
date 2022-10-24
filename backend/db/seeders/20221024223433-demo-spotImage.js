'use strict';

// /** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: "test1.png",
        preview: true
      },
      {
        spotId: 2,
        url: "test2.png",
        preview: true
      },
      {
        spotId: 3,
        url: "test3.png",
        preview: true
      },
      {
        spotId: 4,
        url: "test4.png",
        preview: true
      },
      {
        spotId: 5,
        url: "test5.png",
        preview: true
      }, ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('SpotImages', null, {});
  }
};
