module.exports = (sequelize, Sequelize) => {
  const GroupMeta = sequelize.define("GroupMeta", {
    GroupMetaId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    key: {
      type: Sequelize.STRING,
    },

    content: {
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

  return GroupMeta;
};
