'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up( queryInterface, Sequelize ) {
    await queryInterface.addColumn('Borrower', 'password', {
      type: Sequelize.STRING,
      allowNull: false
    });
  },

  async down({ context: queryInterface }) {
    await queryInterface.removeColumn('Borrower', 'password');
  },
};
