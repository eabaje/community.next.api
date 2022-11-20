module.exports = (sequelize, Sequelize) => {
  const RelationDetail = sequelize.define("Relation_Detail", {
    RelationDetailId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
      type: Sequelize.DATE,
    },
    updatedBy: {
      type: Sequelize.STRING,
    },
    updatedAt: {
      type: Sequelize.DATE,
    },
  });

  return RelationDetail;
};
