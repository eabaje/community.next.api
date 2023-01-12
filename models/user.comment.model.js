module.exports = (sequelize, DataTypes) => {
  const UserComment = sequelize.define("user_comments", {
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
  });

  return UserComment;
};
