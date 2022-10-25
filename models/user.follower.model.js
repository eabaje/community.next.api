module.exports = (sequelize, Sequelize) => {
  const UserFollower = sequelize.define("UserFollower", {
    UserFollowerId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    SourceId: {
      type: Sequelize.INTEGER,
    },
    TargetId: {
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

  return UserFollower;
};
