"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Messages", "chatId", Sequelize.INTEGER, {
      allowNull: false,
      references: {
        model: {
          tableName: "Chats",
        },
        key: "id",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Messages", "chatId");
  },
};
