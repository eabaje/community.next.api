module.exports = (sequelize, Sequelize) => {
  const UserMessage = sequelize.define("user_message", {
    UserMessageId: {
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

  return UserMessage;
};
