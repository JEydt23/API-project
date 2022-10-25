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
			}
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Reviews', null, {});
	}
};
