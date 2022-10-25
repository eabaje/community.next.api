module.exports = (sequelize, Sequelize) => {
  const UserFriend = sequelize.define("UserFriend", {
    UserFriendId: {
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

  return UserFriend;
};
