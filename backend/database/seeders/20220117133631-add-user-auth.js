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
      'user_auths',
      [
        {
          uuid: '650ce1cc-5444-4bc4-a957-a5ea26dcb2ee',
          user_id: 1,
          role_id: 1,
          passwordHash:
            '$2b$10$V/MWeOlczkSSW5ZQkvBc6Olfd4Jb4wX/Zi5Pq1BQ9S3ENwRj0Qwoa',
          createdAt: '2021-12-02T09:23:48.221Z',
          updatedAt: '2021-12-02T09:23:48.221Z',
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
    await queryInterface.bulkDelete('user_auths', null, {});
  },
};
