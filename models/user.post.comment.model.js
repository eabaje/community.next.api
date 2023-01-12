module.exports = (sequelize, Sequelize) => {
  const UserPostComment = sequelize.define("user_post_comment", {
    UserPostCommentId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    SenderId: {
      type: Sequelize.STRING,
    },
    Comment: {
      type: Sequelize.STRING,
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

  return UserPostComment;
};
