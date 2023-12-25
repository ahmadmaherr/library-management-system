'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable("Book", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement : true
      },
      
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    
      ISBN: {
        type:  Sequelize.STRING(17),
        defaultValue: true,
        allowNull: false,
      },
    
      availableQuantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable("Book");
  }
};
