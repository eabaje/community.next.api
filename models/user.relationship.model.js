module.exports = (sequelize, Sequelize) => {
  const UserRelationship = sequelize.define("user_relationship", {
    UserRelationId: {
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
    Type: {
      type: Sequelize.ENUM("friend", "follower"),
    },
    Status: {
      type: Sequelize.ENUM("R", "A", "D", "B"), //Requested,Accepted,Declined,Blocked
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
