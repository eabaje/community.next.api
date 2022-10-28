module.exports = (sequelize, Sequelize) => {
  const RelationSecondary = sequelize.define("RelationSecondary", {
    RelationId: {
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
    MaidenName: {
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
    Age: {
      type: Sequelize.STRING,
    },
    Sex: {
      type: Sequelize.STRING,
    },
    Tribe: {
      type: Sequelize.STRING,
    },

    FamilyName: {
      type: Sequelize.STRING,
    },
    Language: {
      type: Sequelize.STRING,
    },
    Kindred: {
      type: Sequelize.STRING,
    },
    Clan: {
      type: Sequelize.STRING,
    },
    City: {
      type: Sequelize.STRING,
    },
    HomeTown: {
      type: Sequelize.STRING,
    },
    LGA: {
      type: Sequelize.STRING,
    },
    State: {
      type: Sequelize.STRING,
    },
    Country: {
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

  return RelationSecondary;
};
