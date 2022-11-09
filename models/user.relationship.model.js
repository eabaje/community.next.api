module.exports = (sequelize, Sequelize) => {
  const UserRelationship = sequelize.define("user_relationship", {
    UserFollowerId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    FollowerId: {
      type: Sequelize.STRING,
    },
    FollowedId: {
      type: Sequelize.STRING,
    },
    Type: {
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

  return UserRelationship;
};
