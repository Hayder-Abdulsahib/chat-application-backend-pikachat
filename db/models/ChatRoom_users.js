module.exports = (sequelize) => {
  const ChatRoom_users = sequelize.define("Connect", {});

  ChatRoom_users.associate = (models) => {
    models.Chat.belongsToMany(models.User, {
      through: ChatRoom_users,
      foreignKey: "chatId",
      as: "users",
    });
    models.User.belongsToMany(models.Chat, {
      through: ChatRoom_users,
      foreignKey: "userId",
      as: "chats",
    });
  };

  return ChatRoom_users;
};
