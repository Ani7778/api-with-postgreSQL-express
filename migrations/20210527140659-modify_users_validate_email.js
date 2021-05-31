'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    console.log("Migrate CH column")
    await queryInterface.changeColumn('users', 'email', {
      type: Sequelize.STRING,
      unique: {msg: 'Email must be unique'},
      allowNull: false
    }).catch(console.error);
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
