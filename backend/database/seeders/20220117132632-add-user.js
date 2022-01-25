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
      'users',
      [
        {
          uuid: '98bc8de8-bf8b-46bc-9c52-d9c811d649e5',
          name: 'Speed',
          surename: 'Koji',
          dateOfBirth: '2000-03-25T06:00:00z',
          gender: 'male',
          email: 'admin@planeapp.com',
          username: 'speedkoji',
          createdAt: '2021-12-02T09:23:48.221Z',
          updatedAt: '2021-12-02T09:23:48.221Z',
        },
        {
          uuid: 'af333bbe-edf3-463c-a87b-141beb02a253',
          name: 'Bon',
          surename: 'Clay',
          dateOfBirth: '2000-03-25T06:00:00z',
          gender: 'male',
          email: 'bonclay@baroqueworks.com',
          username: 'bonclay',
          company_id: 1,
          createdAt: '2021-12-02T09:23:48.221Z',
          updatedAt: '2021-12-02T09:23:48.221Z',
        },
        {
          uuid: 'aab8791b-9710-4061-96cc-68b8c65dea5d',
          name: 'Zoro',
          surename: 'Juro',
          dateOfBirth: '2000-03-25T06:00:00z',
          gender: 'male',
          email: 'zorojuro@gmail.com',
          username: 'zorojuro',
          createdAt: '2021-12-02T09:23:48.221Z',
          updatedAt: '2021-12-02T09:23:48.221Z',
        },
        {
          uuid: '2a8ebead-af4c-4dc5-b030-0fd9cc43fc56',
          name: 'Elizabeth',
          surename: 'Swann',
          dateOfBirth: '2000-03-25T06:00:00z',
          gender: 'female',
          email: 'elizabethswann@eicompany.com',
          username: 'liz',
          company_id: 2,
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
    await queryInterface.bulkDelete('users', null, {});
  },
};
