module.exports = (sequelize, Sequelize) => {
  const UserPostLike = sequelize.define("user_post_like", {
    UserPostLikeId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    UserPostId: {
      type: Sequelize.INTEGER,
    },
    SenderId: {
      type: Sequelize.STRING,
    },
    Likes: {
      type: Sequelize.INTEGER,
    },
    createdBy: {
      type: Sequelize.STRING,
    },
    createdAt: {
      type: Sequelize.DATE,
    },
    updatedBy: {
      type: Sequelize.STRING,
    },
    updatedAt: {
      type: Sequelize.DATE,
    },
  });

  return UserPostLike;
};
