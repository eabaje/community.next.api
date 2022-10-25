module.exports = (sequelize, Sequelize) => {
  const GroupMember = sequelize.define("GroupMember", {
    GroupMemberId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    Type: {
      type: Sequelize.INTEGER,
    },
    Status: {
      type: Sequelize.INTEGER,
    },
    Notes: {
      type: Sequelize.STRING,
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

  return GroupMember;
};
