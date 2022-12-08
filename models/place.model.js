module.exports = (sequelize, Sequelize) => {
  const PlaceLived = sequelize.define("Place_of_residence", {
    PlaceLivedId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    NeighborhoodName: {
      type: Sequelize.STRING,
    },
    City: {
      type: Sequelize.STRING,
    },
    Address: {
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

  return PlaceLived;
};
