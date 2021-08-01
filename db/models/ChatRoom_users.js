module.exports = (sequelize, DataTypes) => {
  const ChatRoom_users = sequelize.define("Connect", {});

  ChatRoom_users.associate = (models) => {
    models.Chat.belongsToMany(models.User, {
      through: ChatRoom_users,
      foreignKey: "chatId",
    });
    models.User.belongsToMany(models.Chat, {
      through: ChatRoom_users,
      foreignKey: "userId",
    });
  };

  return ChatRoom_users;
};
