'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('destinasi', {
      fields: ['gambar'],
      type: 'unique',
      name: 'unique_gambar_constraint'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('destinasi', 'unique_gambar_constraint');
  }
};
