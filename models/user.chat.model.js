module.exports = (sequelize, Sequelize) => {
  const UserChat = sequelize.define("UserChat", {
    UserChatId: {
      type: DataTypes.INTEGER,
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
    Likes: {
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

  return UserChat;
};
