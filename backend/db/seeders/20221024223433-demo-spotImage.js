'use strict';

// /** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-21409981/original/a8fa243d-dac8-4238-93e5-f7aa33072ff8.jpeg?im_w=720",
        preview: true
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/2ad32f65-5c21-4a51-a02a-d2aa6da773b8.jpg?im_w=720",
        preview: true
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-39441496/original/d990acce-13ea-4de9-9f2d-6627b04a5601.jpeg?im_w=720",
        preview: true
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/97c31459-2471-4261-806e-b274b077a3be.jpg?im_w=720",
        preview: true
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-53417893/original/63787420-6a55-4d88-b459-c65d0251ba31.jpeg?im_w=720",
        preview: true
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/b1fce802-97ea-4c7e-83b7-b35950fdd37e.jpg?im_w=720",
        preview: true
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/c047d239-ddf4-40b9-864a-a04f185983c3.jpg?im_w=720",
        preview: true
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-669619839372632821/original/6a2f41ac-5ef6-4e14-a8c0-4b17ef530950.jpeg?im_w=720",
        preview: true
      },
      {
        spotId: 9,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-49315530/original/ab428e0e-01f5-491b-bd69-b93819e4f065.jpeg?im_w=720",
        preview: true
      },
      {
        spotId: 10,
        url: "https://a0.muscache.com/im/pictures/25356139/0558c32e_original.jpg?im_w=720",
        preview: true
      },
      {
        spotId: 11,
        url: "https://a0.muscache.com/im/pictures/ea2d5abe-1523-4357-9060-2b652a4c9af3.jpg?im_w=720",
        preview: true
      },
      {
        spotId: 12,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-37720797/original/17ea895f-ab14-48a8-9cdd-1a3f2bb3a0b5.jpeg?im_w=720",
        preview: true
      },
      {
        spotId: 13,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-37720797/original/17ea895f-ab14-48a8-9cdd-1a3f2bb3a0b5.jpeg?im_w=720",
        preview: true
      },
      {
        spotId: 14,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-37720797/original/17ea895f-ab14-48a8-9cdd-1a3f2bb3a0b5.jpeg?im_w=720",
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
