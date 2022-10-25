module.exports = (sequelize, Sequelize) => {
  const UserPostLike = sequelize.define("UserPostLike", {
    UserPostLikeId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    UserPostId: {
      type: Sequelize.INTEGER,
    },
    SenderId: {
      type: Sequelize.INTEGER,
    },
    Likes: {
      type: Sequelize.INTEGER,
    },
    createdBy: {
      type: Sequelize.STRING,
    },
    createdAt: {
      type: Sequelize.DATETIME,
    },
    updatedBy: {
      type: Sequelize.STRING,
    },
    updatedAt: {
      type: Sequelize.DATETIME,
    },
  });

  return UserPostLike;
};
