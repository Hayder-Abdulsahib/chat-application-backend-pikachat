module.exports = (sequelize, DataTypes) => {
  const ChatRoom_msg = sequelize.define("ChatRoom_msg", {
    time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  });

  ChatRoom_msg.associate = (models) => {
    models.Chat.belongsToMany(models.Message, {
      through: ChatRoom_msg,
      foreignKey: "chatId",
    });
    models.Message.belongsToMany(models.Chat, {
      through: ChatRoom_msg,
      foreignKey: "messageId",
    });
  };

  return ChatRoom_msg;
};
