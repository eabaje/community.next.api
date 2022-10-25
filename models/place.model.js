module.exports = (sequelize, Sequelize) => {
  const PlaceLived = sequelize.define("PlaceLived", {
    PlaceLivedId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    NeighborhoodName: {
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
    YearLivedFrom: {
      type: Sequelize.DATETIME,
    },

    YearLivedTo: {
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

  return PlaceLived;
};
