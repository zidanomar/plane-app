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
    await queryInterface.bulkInsert('planes', [
      {
        uuid: '7bc90e78-6f55-454b-a7d9-e556908c44f9',
        name: 'Silver Dragon',
        aircraft_number: '34004',
        tail_number: '54004',
        isDelivered: true,
        createdAt: '2021-12-02T09:30:55.076Z',
        updatedAt: '2021-12-02T09:30:55.076Z',
        company_id: 1,
      },
      {
        uuid: '24fe9e23-c9bc-495e-9718-d19eac20721c',
        name: 'Excalibur',
        aircraft_number: '34004',
        tail_number: '54004',
        isDelivered: true,
        createdAt: '2021-12-02T09:30:42.445Z',
        updatedAt: '2021-12-02T09:30:42.445Z',
        company_id: 1,
      },
      {
        uuid: 'ddaf2620-a710-4c15-9e6c-d45566df577c',
        name: 'Thousand Sunny',
        aircraft_number: '34002',
        tail_number: '54002',
        isDelivered: false,
        createdAt: '2021-12-02T09:28:29.273Z',
        updatedAt: '2021-12-02T09:28:29.273Z',
        company_id: 2,
      },
      {
        uuid: '527b1d4f-c9de-4fd0-8e54-492edcd4009b',
        name: 'Ohara',
        aircraft_number: '34006',
        tail_number: '54006',
        isDelivered: false,
        createdAt: '2021-12-02T09:32:11.954Z',
        updatedAt: '2021-12-02T09:32:11.954Z',
        company_id: 2,
      },
      {
        uuid: '0f40a1c6-d156-4f3b-b1da-435eb9e18549',
        name: 'Little Garden',
        aircraft_number: '34005',
        tail_number: '54005',
        isDelivered: false,
        createdAt: '2021-12-02T09:31:57.491Z',
        updatedAt: '2021-12-02T09:31:57.491Z',
        company_id: 2,
      },
      {
        uuid: '93e93915-0d08-4785-9225-297a5f29421f',
        name: 'All Sunday',
        aircraft_number: '34005',
        tail_number: '54005',
        isDelivered: true,
        createdAt: '2021-12-02T09:31:44.463Z',
        updatedAt: '2021-12-02T09:31:44.463Z',
        company_id: 3,
      },
      {
        uuid: '934405dc-5b13-488d-bb7c-2dbca607555a',
        name: 'Flying Dutchman',
        aircraft_number: '34001',
        tail_number: '54001',
        isDelivered: false,
        createdAt: '2021-12-02T09:25:13.044Z',
        updatedAt: '2021-12-02T09:25:13.044Z',
        company_id: 3,
      },
      {
        uuid: '94b22935-4b7d-403b-9eec-e335d248a9a2',
        name: 'Black Pearl',
        aircraft_number: '34001',
        tail_number: '54001',
        isDelivered: true,
        createdAt: '2021-12-02T09:24:59.146Z',
        updatedAt: '2021-12-02T09:24:59.146Z',
        company_id: 3,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('planes', null, {});
  },
};
