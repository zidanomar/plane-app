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
      'roles',
      [
        {
          uuid: '7c5ca302-3134-432d-bd84-0a4bb47aa6a4',
          role: 'admin',
          createdAt: '2021-12-02T12:09:57.601Z',
          updatedAt: '2021-12-02T12:09:57.601Z',
        },
        {
          uuid: '0b7ab23d-25ef-496a-9fd0-9a5196871cfa',
          role: 'user',
          createdAt: '2021-12-02T12:09:57.601Z',
          updatedAt: '2021-12-02T12:09:57.601Z',
        },
        {
          uuid: '6df9f6f9-b65c-4d66-9f0f-c0aea8235dbf',
          role: 'company',
          createdAt: '2021-12-02T12:09:57.601Z',
          updatedAt: '2021-12-02T12:09:57.601Z',
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
  },
};
