module.exports = (sequelize, Sequelize) => {
  const GroupMessage = sequelize.define("GroupMessage", {
    GroupMessageId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Message: {
      type: Sequelize.STRING,
      defaultValue: "",
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

  return GroupMessage;
};
