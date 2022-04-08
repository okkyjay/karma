'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('account', [
      {
        id: 1,
        auth_id: '20S0KPNOIM',
        username: 'azr1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        auth_id: '54P2EOKQ47',
        username: 'azr2',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 3,
        auth_id: '9LLV6I4ZWI',
        username: 'azr3',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 4,
        auth_id: 'YHWE3HDLPQ',
        username: 'azr4',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 5,
        auth_id: '6DLH8A25XZ',
        username: 'azr5',
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('user', null, {});
  }
};
