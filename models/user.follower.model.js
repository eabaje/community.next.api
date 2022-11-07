module.exports = (sequelize, Sequelize) => {
  const UserFollower = sequelize.define("user_follower", {
    UserFollowerId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    SourceId: {
      type: Sequelize.STRING,
    },
    TargetId: {
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

  return UserFollower;
};
