module.exports = (sequelize, Sequelize) => {
  const Group = sequelize.define("Group", {
    GroupId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Title: {
      type: Sequelize.STRING,
    },
    MetaTitle: {
      type: Sequelize.STRING,
    },
    Slug: {
      type: Sequelize.STRING,
    },
    Summary: {
      type: Sequelize.STRING,
    },
    Status: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    Profile: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
    Content: {
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

  return Group;
};
