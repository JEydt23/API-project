'use strict';

// /** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: "https://www.dmarge.com/wp-content/uploads/2020/07/qld-exterior.jpg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcljBXDnfgzsTZeVOBj-QA9mKhyn2VAP744Q&usqp=CAU",
        preview: true
      },
      {
        spotId: 3,
        url: "https://na.rdcpix.com/745ad62cc62d7347941c32fece2be067w-c1701926610rd-w832_h468_r4_q80.jpg",
        preview: true
      },
      {
        spotId: 4,
        url: "https://cloudfront-us-east-1.images.arcpublishing.com/tronc/QBPKE2Z5CNEX3OKYUAATJCEE2E.jpg",
        preview: true
      },
      {
        spotId: 5,
        url: "https://thumbs.dreamstime.com/z/nice-luxury-yacht-coastal-mansion-intracoastal-waterway-fort-lauderdale-florida-yacht-coastal-mansion-119370410.jpg",
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
