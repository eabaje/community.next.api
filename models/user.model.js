module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    UserId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
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
    UserName: {
      type: Sequelize.STRING,
    },
    Mobile: {
      type: Sequelize.STRING,
    },
    Email: {
      type: Sequelize.STRING,
    },
    Sex: {
      type: Sequelize.STRING,
    },
    Age: {
      type: Sequelize.STRING,
    },
    BloodGroup: {
      type: Sequelize.STRING,
    },
    MaritalStatus: {
      type: Sequelize.STRING,
    },
    Languages: {
      type: Sequelize.STRING,
    },
    Occupation: {
      type: Sequelize.STRING,
    },
    EmploymentStatus: {
      type: Sequelize.STRING,
    },
    PasswordHash: {
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
    RegisteredAt: {
      type: Sequelize.DATE,
    },
    LastLogin: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    Desc: {
      type: Sequelize.STRING,
      max: 50,
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

    IsActivated: {
      type: Sequelize.BOOLEAN,
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

  return User;
};
