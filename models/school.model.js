module.exports = (sequelize, Sequelize) => {
  const School = sequelize.define("School", {
    SchoolId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
      type: Sequelize.DATETIME,
    },

    YearTo: {
      type: Sequelize.DATETIME,
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

  return School;
};
