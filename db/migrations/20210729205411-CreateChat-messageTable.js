"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("ChatRoom_msg", {
      chatId: {
        type: Sequelize.INTEGER,
        reference: {
          model: {
            tableName: "Chat",
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
            tableName: "Message",
            schema: "schema",
          },
          key: "id",
        },
        allowNull: false,
      },

      time: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },

      updatedAt: { type: Sequelize.DATE, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("ChatRoom_msg");
  },
};
