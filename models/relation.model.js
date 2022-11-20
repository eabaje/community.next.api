module.exports = (sequelize, Sequelize) => {
  const Relation = sequelize.define("Relation", {
    RelationId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    RelationType: {
      type: Sequelize.ENUM(
        "sp",
        "ch",
        "sib",
        "p",
        "wf",
        "gp",
        "ggp",
        "gch",
        "ggch"
      ),
    },
    FirstName: {
      type: Sequelize.STRING,
    },
    MiddleName: {
      type: Sequelize.STRING,
    },
    LastName: {
      type: Sequelize.STRING,
    },
    Nickname: {
      type: Sequelize.STRING,
    },
    Level: {
      type: Sequelize.STRING,
    },
    Parent: {
      type: Sequelize.JSON,
    },

    Partner: {
      type: Sequelize.JSON,
    },
    Children: {
      type: Sequelize.JSON,
    },
    Sibling: {
      type: Sequelize.JSON,
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

  return Relation;
};
