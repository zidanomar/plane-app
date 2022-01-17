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
      'companies',
      [
        {
          uuid: '18eb02f5-628e-4007-9a71-bcd1eac30979',
          name: 'East India Company',
          createdAt: '2021-12-02T09:23:48.221Z',
          updatedAt: '2021-12-02T09:23:48.221Z',
        },
        {
          uuid: '85514576-dc40-4e64-8d00-e323d91c2720',
          name: 'Baroque Works',
          createdAt: '2021-12-02T09:24:00.246Z',
          updatedAt: '2021-12-02T09:24:00.246Z',
        },
        {
          uuid: '88373ba8-ed80-4031-8c9e-c3a719f1ded4',
          name: 'Donquixote',
          createdAt: '2021-12-02T09:24:11.414Z',
          updatedAt: '2021-12-02T09:24:11.414Z',
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
    await queryInterface.bulkDelete('companies', null, {});
  },
};
