"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Rooms", {
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

      messageId: {
        type: Sequelize.INTEGER,
        reference: {
          model: {
            tableName: "Messages",
            schema: "schema",
          },
          key: "id",
        },
        allowNull: false,
      },

      text: Sequelize.STRING,
      image: Sequelize.STRING,

      updatedAt: { type: Sequelize.DATE, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Rooms");
  },
};
