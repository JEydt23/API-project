'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Spots'
    await queryInterface.bulkInsert(options, [
      {
        // 1
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
        // 2
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
        // 3
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
        // 4
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
        // 5
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
      {
        // 6
        ownerId: 1,
        address: '86 Highland Ave',
        city: 'Rowayton',
        state: 'CT',
        country: 'United States',
        lat: 41.145432,
        lng: -73.536332,
        name: 'Victorian Farmhouse',
        description: 'Historical house, built in 1888. Come stay in this cozy farmhouse with a coastal twist!',
        price: 2250
      },
      {
        // 7
        ownerId: 2,
        address: '14 Flicker Lane',
        city: 'Rowayton',
        state: 'CT',
        country: 'United States',
        lat: 41.145432,
        lng: -73.536332,
        name: 'Honey Fitz Residence',
        description: 'Haunted house! Can you survive the night?',
        price: 1050
      },
      {
        // 8
        ownerId: 3,
        address: '54 Circle Road',
        city: 'Darien',
        state: 'CT',
        country: 'United States',
        lat: 41.077212,
        lng: -73.468721,
        name: 'Circle Cottage',
        description: 'Tiny house with big personality.',
        price: 850
      },
      {
        // 9
        ownerId: 1,
        address: '2 Weaver Street',
        city: 'Stamford',
        state: 'CT',
        country: 'United States',
        lat: 41.084512,
        lng: -73.532222,
        name: 'Modern Townhouse',
        description: 'Designed by local artist, enjoy the unique layout.',
        price: 1050
      },
      {
        // 10
        ownerId: 1,
        address: '1 Sleepy Hollow Lane',
        city: 'New Canaan',
        state: 'CT',
        country: 'United States',
        lat: 41.1468,
        lng: -73.4948,
        name: 'Dude Ranch',
        description: 'Giddy up partner! Enjoy this rustic ranch.',
        price: 2250
      },
      {
        // 11
        ownerId: 3,
        address: '98 Hoyt Street',
        city: 'New Canaan',
        state: 'CT',
        country: 'United States',
        lat: 41.1468,
        lng: -73.4948,
        name: 'Benson Bed and Breakfast',
        description: 'Quaint BnB accepting visitors!',
        price: 1550
      },
      {
        // 12
        ownerId: 3,
        address: '55 Easy Street',
        city: 'Greenwich',
        state: 'CT',
        country: 'United States',
        lat: 41.0262,
        lng: -73.6282,
        name: 'Studio Apartment',
        description: 'Affordable living in a not-so-affordable town.',
        price: 750
      },
      {
        // 13
        ownerId: 2,
        address: '789 Bingbong Lane',
        city: 'Greenwich',
        state: 'CT',
        country: 'United States',
        lat: 41.0262,
        lng: -73.6282,
        name: 'Small Room for Small Person',
        description: 'It is a small place, you have been warned.',
        price: 50
      },
      {
        // 14
        ownerId: 2,
        address: '512 Boogaloo Drive',
        city: 'Westport',
        state: 'CT',
        country: 'United States',
        lat: 41.141,
        lng: -73.3579,
        name: 'Beach Bungalow for Beach Bums ',
        description: 'If you like the beach, then you will like this place. Right on the water with a private beach. Totally tubular.',
        price: 750
      },
      {
        // 15
        ownerId: 2,
        address: '512 Boogaloo Drive',
        city: 'Westport',
        state: 'CT',
        country: 'United States',
        lat: 41.141,
        lng: -73.3579,
        name: 'Beach Bungalow for Beach Bums ',
        description: 'If you like the beach, then you will like this place. Right on the water with a private beach. Totally tubular.',
        price: 750
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkDelete(options);
  }
};
