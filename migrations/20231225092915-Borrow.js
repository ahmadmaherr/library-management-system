'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable("Borrow", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      
      bookId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
    
      borrowerId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
    
      isReturned: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
    
      borrowDate: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      },
    
      returnDate: {
        type: "TIMESTAMP",
        allowNull: false
      },
    
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false
      },
      
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false
      },
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable("Borrow");
  }
};
