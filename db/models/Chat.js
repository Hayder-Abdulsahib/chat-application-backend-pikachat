const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define("Chat", {
    name: {
      type: DataTypes.STRING,
    },
    slug: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
  });

  SequelizeSlugify.slugifyModel(Chat, {
    source: ["name"],
  });

  Chat.associate = (models) => {
    models.User.hasMany(Chat, {
      foreignKey: "userId",
      allowNull: false,
    });

    Chat.belongsTo(models.User, { foreignKey: "userId" });
  };

  return Chat;
};
