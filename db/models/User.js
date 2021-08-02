module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    bio: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Message, {
      foreignKey: "userId",
      allowNull: false,
    });

    models.Message.belongsTo(User, { foreignKey: "userId" });
  };

  return User;
};
