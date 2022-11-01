module.exports = (sequelize, Sequelize) => {
  const School = sequelize.define("School", {
    SchoolId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    SchoolName: {
      type: Sequelize.STRING,
    },
    Address: {
      type: Sequelize.STRING,
    },
    City: {
      type: Sequelize.STRING,
    },
    State: {
      type: Sequelize.STRING,
    },
    Country: {
      type: Sequelize.STRING,
    },
    YearFrom: {
      type: Sequelize.DATE,
    },

    YearTo: {
      type: Sequelize.DATE,
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

  return School;
};
