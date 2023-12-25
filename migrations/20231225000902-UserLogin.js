'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable("UserLogin", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    
      token: {
        type: Sequelize.TEXT
      },
    
      email: {
        type: Sequelize.STRING,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable("UserLogin");
  }
};
