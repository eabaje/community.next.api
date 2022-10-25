module.exports = (sequelize, Sequelize) => {
  const RelationPrimary = sequelize.define("RelationPrimary", {
    RelationPrimaryId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    RelationType: {
      type: Sequelize.ENUM(0, 1, 2, 3),
      defaultValue: 0,
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

    ProfilePicture: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
    CoverPicture: {
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
      type: Sequelize.DATETIME,
    },
    updatedBy: {
      type: Sequelize.STRING,
    },
    updatedAt: {
      type: Sequelize.DATETIME,
    },
  });

  return RelationPrimary;
};
