'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('password', salt);

    await queryInterface.bulkInsert(
      'user_auths',
      [
        {
          uuid: '650ce1cc-5444-4bc4-a957-a5ea26dcb2ee',
          user_id: 1,
          role_id: 1,
          passwordHash: passwordHash,
          createdAt: '2021-12-02T09:23:48.221Z',
          updatedAt: '2021-12-02T09:23:48.221Z',
        },
        {
          uuid: '4c573876-ede6-412d-a211-b09cd811c60d',
          user_id: 2,
          role_id: 3,
          passwordHash: passwordHash,
          createdAt: '2021-12-02T09:23:48.221Z',
          updatedAt: '2021-12-02T09:23:48.221Z',
        },
        {
          uuid: '5163b008-ce2a-465c-8a1d-38ae6a616df8',
          user_id: 3,
          role_id: 2,
          passwordHash: passwordHash,
          createdAt: '2021-12-02T09:23:48.221Z',
          updatedAt: '2021-12-02T09:23:48.221Z',
        },
        {
          uuid: '55312be1-cc8f-4dab-81c4-4a6c78e891dd',
          user_id: 4,
          role_id: 3,
          passwordHash: passwordHash,
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
