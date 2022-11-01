module.exports = (sequelize, Sequelize) => {
  const Group = sequelize.define("groups", {
    GroupId: {
      type: Sequelize.INTEGER,
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
      type: Sequelize.INTEGER,
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
      type: Sequelize.DATE,
    },
    updatedBy: {
      type: Sequelize.STRING,
    },
    updatedAt: {
      type: Sequelize.DATE,
    },
  });

  return Group;
};
