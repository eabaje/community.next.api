module.exports = (sequelize, Sequelize) => {
  const UserPost = sequelize.define("user_post", {
    UserPostId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    // UserId: {
    //   type: Sequelize.STRING,
    // },
    SenderId: {
      type: Sequelize.STRING,
    },
    Message: {
      type: Sequelize.STRING,
    },
    ImgUrl: {
      type: Sequelize.STRING,
    },
    Likes: {
      type: Sequelize.INTEGER,
    },
    Share: {
      type: Sequelize.INTEGER,
    },
    IsActive: {
      type: Sequelize.BOOLEAN,
    },
    IsPublic: {
      type: Sequelize.BOOLEAN,
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

  return UserPost;
};
