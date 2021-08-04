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

  return Message;
};
