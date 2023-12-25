'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up( queryInterface, Sequelize) {
    await queryInterface.addColumn('UserLogin', 'createdAt', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    });

    await queryInterface.addColumn('UserLogin', 'updatedAt', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    });
  },

  async down({ context: queryInterface }) {
    await queryInterface.removeColumn('UserLogin', 'createdAt');
    await queryInterface.removeColumn('UserLogin', 'updatedAt');
  },
};
