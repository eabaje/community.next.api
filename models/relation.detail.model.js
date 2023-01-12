module.exports = (sequelize, Sequelize) => {
  const RelationDetail = sequelize.define("relation_detail", {
    RelationDetailId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Title: {
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
    MaritalStatus: {
      type: Sequelize.STRING,
    },

    Occupation: {
      type: Sequelize.STRING,
    },
    EmploymentStatus: {
      type: Sequelize.STRING,
    },
    Age: {
      type: Sequelize.STRING,
    },
    DOB: {
      type: Sequelize.DATEONLY,
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
