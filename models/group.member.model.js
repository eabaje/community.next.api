module.exports = (sequelize, Sequelize) => {
  const GroupMember = sequelize.define("Group_Member", {
    GroupMemberId: {
      type: Sequelize.INTEGER,
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
      type: Sequelize.DATE,
    },
    updatedBy: {
      type: Sequelize.STRING,
    },
    updatedAt: {
      type: Sequelize.DATE,
    },
  });

  return GroupMember;
};
