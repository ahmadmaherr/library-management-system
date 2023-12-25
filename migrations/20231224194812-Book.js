'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up( queryInterface, Sequelize) {
    await queryInterface.addColumn('Book', 'createdAt', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    });

    await queryInterface.addColumn('Book', 'updatedAt', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    });
  },

  async down({ context: queryInterface }) {
    await queryInterface.removeColumn('Book', 'createdAt');
    await queryInterface.removeColumn('Book', 'updatedAt');
  },
};
