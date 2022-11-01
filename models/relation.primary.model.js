module.exports = (sequelize, Sequelize) => {
  const RelationPrimary = sequelize.define("relation_primary", {
    RelationPrimaryId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },

    RelationType: {
      type: Sequelize.ENUM("sp", "ch", "sib"),
      defaultValue: "sp",
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
    Mobile: {
      type: Sequelize.STRING,
    },
    Email: {
      type: Sequelize.STRING,
    },
    Age: {
      type: Sequelize.STRING,
    },
    ProfilePicture: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
    CoverPicture: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
    Language: {
      type: Sequelize.STRING,
      defaultValue: "",
    },

    Desc: {
      type: Sequelize.STRING,
      max: 50,
    },
    Sex: {
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

  return RelationPrimary;
};
