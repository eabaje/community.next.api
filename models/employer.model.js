module.exports = (sequelize, Sequelize) => {
  const Employer = sequelize.define("Employer", {
    EmployerId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    CompanyName: {
      type: Sequelize.STRING,
    },
    Mobile: {
      type: Sequelize.STRING,
    },
    Email: {
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

  return Employer;
};
