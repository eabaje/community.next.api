module.exports = (sequelize, Sequelize) => {
  const UserEvent = sequelize.define("user_event", {
    UserEventId: {
      type: DataTypes.INTEGER,
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

  return UserEvent;
};
