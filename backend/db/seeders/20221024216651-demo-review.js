'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('Reviews', [
			{
				spotId: 1,
				userId: 1,
				review: 'Excellent, would stay again!',
				stars: 5
			},
			{
				spotId: 2,
				userId: 2,
				review: 'Not too shabby',
				stars: 4
			},
			{
				spotId: 3,
				userId: 1,
				review: 'STAY AWAY, this was terrible',
				stars: 1
			},
			{
				spotId: 4,
				userId: 3,
				review: 'Filthy and disgusting',
				stars: 1
			},
			{
				spotId: 5,
				userId: 2,
				review: 'Just okay. Nothing to write home about.',
				stars: 2
			},
			{
				spotId: 6,
				userId: 3,
				review: 'Fantastic.',
				stars: 5
			},
			{
				spotId: 7,
				userId: 1,
				review: 'Pretty good.',
				stars: 4
			}, {
				spotId: 8,
				userId: 2,
				review: 'Average.',
				stars: 3
			},
			{
				spotId: 9,
				userId: 3,
				review: 'AVOID AT ALL COSTS.',
				stars: 1
			},
			{
				spotId: 10,
				userId: 1,
				review: 'Enjoyable.',
				stars: 3
			},
			{
				spotId: 11,
				userId: 2,
				review: 'Very good.',
				stars: 4
			},
			{
				spotId: 12,
				userId: 3,
				review: 'Just okay.',
				stars: 2
			}
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Reviews', null, {});
	}
};
