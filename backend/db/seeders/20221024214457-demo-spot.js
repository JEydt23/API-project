'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: '123 Rowayton Ave',
        city: 'Rowayton',
        state: 'CT',
        country: 'United States',
        lat: 41.121880,
        lng: -73.436432,
        name: '5 Mile River Condos',
        description: 'See the boats come into Rowayton Harbor from the porch of a cozy condo.',
        price: 1250
      },
      {
        ownerId: 2,
        address: '456 Highland Ave',
        city: 'Rowayton',
        state: 'CT',
        country: 'United States',
        lat: 41.145432,
        lng: -73.536332,
        name: 'Old Victorian Farmhouse',
        description: 'Built in 1880, this old Victorian Farmhouse has been renovated with modern amenities.',
        price: 1550
      },
      {
        ownerId: 2,
        address: '78 High Ridge Road',
        city: 'Stamford',
        state: 'CT',
        country: 'United States',
        lat: 41.053412,
        lng: -73.538742,
        name: 'High Ridge Tudor',
        description: 'Tudor-style house located at the top of North Stamford.',
        price: 2250
      },
      {
        ownerId: 3,
        address: '901 Post Road',
        city: 'Darien',
        state: 'CT',
        country: 'United States',
        lat: 41.077212,
        lng: -73.468721,
        name: 'Longshore Ranch',
        description: 'Ranch-style house, 1 floor, located next to local golf course.',
        price: 890
      },
      {
        ownerId: 3,
        address: '234 Long Ridge Road',
        city: 'Stamford',
        state: 'CT',
        country: 'United States',
        lat: 41.084512,
        lng: -73.532222,
        name: 'Long Ridge Cabin',
        description: 'Former hunters lodge turned cozy cabin located just off Merritt Parkway.',
        price: 1105
      },
      ], {});
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Spots', null, {});
  }
};
