'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      'flights',
      [
        {
          uuid: 'ff92e34c-d12d-4d3b-9343-a8478afe6595',
          depature_date: '2021-12-05T01:50:00.000Z',
          arrival_date: '2021-12-05T19:43:00.000Z',
          duration: 18,
          createdAt: '2021-12-02T12:09:57.601Z',
          updatedAt: '2021-12-02T12:09:57.601Z',
          plane_id: 1,
        },
        {
          uuid: '07c8e83c-b0b5-42af-b70b-49ae31747bff',
          depature_date: '2021-12-05T01:50:00.000Z',
          arrival_date: '2021-12-05T19:43:00.000Z',
          duration: 18,
          createdAt: '2021-12-02T12:11:16.913Z',
          updatedAt: '2021-12-02T12:11:16.913Z',
          plane_id: 6,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('flights', null, {});
  },
};
