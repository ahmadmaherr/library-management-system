'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up( queryInterface, Sequelize ) {
    await queryInterface.addColumn('Author', 'createdAt', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    });

    await queryInterface.addColumn('Author', 'updatedAt', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    });
  },

  async down({ context: queryInterface }) {
    await queryInterface.removeColumn('Author', 'createdAt');
    await queryInterface.removeColumn('Author', 'updatedAt');
  },
};
