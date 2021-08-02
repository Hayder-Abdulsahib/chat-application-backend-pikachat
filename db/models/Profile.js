const sequelizeSlugify = require("sequelize-slugify");
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define("Profile", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    username: {
      type: DataTypes.STRING,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    image: {
      type: DataTypes.STRING,
    },
    bio: {
      type: DataTypes.STRING,
    },

    isOnLine: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
  sequelizeSlugify.slugifyModel(Profile, {
    source: ["username"],
  });

  // Profile.associate = (models) => {
  //   models.User.hasOne(Profile, {
  //     foreignKey: "userId",
  //     alloNull: false,
  //   });

  //   Profile.belongsTo(models.User, { foreignKey: "userId" });
  // };

  return Profile;
};
