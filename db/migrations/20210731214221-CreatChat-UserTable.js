"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Connects", {
      chatId: {
        type: Sequelize.INTEGER,
        reference: {
          model: {
            tableName: "Chats",
            schema: "schema",
          },
          key: "id",
        },
        allowNull: false,
      },

      userId: {
        type: Sequelize.INTEGER,
        reference: {
          model: {
            tableName: "Users",
            schema: "schema",
          },
          key: "id",
        },
        allowNull: false,
      },

      updatedAt: { type: Sequelize.DATE, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Connects");
  },
};
