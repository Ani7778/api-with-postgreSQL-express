'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'password',{ type: Sequelize.STRING});
  },

  // down: async (queryInterface, Sequelize) => {
  //   /**
  //    * Add reverting commands here.
  //    *
  //    * Example:
  //    * await queryInterface.dropTable('users');
  //    */
  // }
};
