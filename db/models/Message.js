module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define("Message", {
    text: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
  });

  Message.associate = (models) => {
    models.Chat.hasMany(Message, {
      foreignKey: "chatId",
      as: "messages",
      allowNull: false,
    });

    Message.belongsTo(models.Chat, { foreignKey: "chatId" });
  };

  // Message.associate = (models) => {
  //   models.User.hasMany(Message, {
  //     foreignKey: "userId",
  //     allowNull: false,
  //   });

  //   Message.belongsTo(models.User, { foreignKey: "userId" });
  // };

  return Message;
};
