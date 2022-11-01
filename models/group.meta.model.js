module.exports = (sequelize, Sequelize) => {
  const GroupMeta = sequelize.define("Group_Meta", {
    GroupMetaId: {
      type: Sequelize.INTEGER,
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
      type: Sequelize.DATE,
    },
    updatedBy: {
      type: Sequelize.STRING,
    },
    updatedAt: {
      type: Sequelize.DATE,
    },
  });

  return GroupMeta;
};
