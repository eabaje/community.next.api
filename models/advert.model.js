module.exports = (sequelize, Sequelize) => {
  const Advert = sequelize.define("Advert", {
    AdvertId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    AdvertName: {
      type: Sequelize.STRING,
    },
    AdvertImgUrl: {
      type: Sequelize.STRING,
    },
    AdvertType: {
      type: Sequelize.STRING,
    },
    AdvertCaption: {
      type: Sequelize.STRING,
    },
    AdvertPage: {
      type: Sequelize.STRING,
    },
    AdvertSection: {
      type: Sequelize.STRING,
    },
    AdvertRegion: {
      type: Sequelize.STRING,
    },
    AdvertCountry: {
      type: Sequelize.STRING,
    },
    AdvertCost: {
      type: Sequelize.STRING,
    },
    Currency: {
      type: Sequelize.STRING,
    },
    IsEnabled: {
      type: Sequelize.BOOLEAN,
    },
    PublishedDateFrom: {
      type: Sequelize.DATE,
    },

    PublishedDateFromTo: {
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

  return Advert;
};
