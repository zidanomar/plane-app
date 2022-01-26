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
          uuid: '85514576-dc40-4e64-8d00-e323d91c2720',
          name: 'Baroque Works',
          imgUrl:
            'https://i.pinimg.com/originals/0b/8d/b8/0b8db8035b3808c53daa9eec3def40b2.png',
          createdAt: '2021-12-02T09:24:00.246Z',
          updatedAt: '2021-12-02T09:24:00.246Z',
        },
        {
          uuid: '18eb02f5-628e-4007-9a71-bcd1eac30979',
          name: 'East India Company',
          imgUrl:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Coat_of_arms_of_the_East_India_Company.svg/2038px-Coat_of_arms_of_the_East_India_Company.svg.png',
          createdAt: '2021-12-02T09:23:48.221Z',
          updatedAt: '2021-12-02T09:23:48.221Z',
        },
        {
          uuid: '88373ba8-ed80-4031-8c9e-c3a719f1ded4',
          name: 'Galley La Company',
          imgUrl:
            'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/680bb227-0c56-4551-9057-05acdfa8ecbe/d5db9gv-79152f70-d77c-4a65-8873-d34362ad5740.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzY4MGJiMjI3LTBjNTYtNDU1MS05MDU3LTA1YWNkZmE4ZWNiZVwvZDVkYjlndi03OTE1MmY3MC1kNzdjLTRhNjUtODg3My1kMzQzNjJhZDU3NDAuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.YcdPb20jG1mCSp3EnDVrqFSoPg8rVSnzg6ZJxNA4Tg0',
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
