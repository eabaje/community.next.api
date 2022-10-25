module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    UserId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
    BloodGroup: {
      type: Sequelize.STRING,
    },
    MaritalStatus: {
      type: Sequelize.STRING,
    },
    Languages: {
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
      type: Sequelize.DATETIME,
    },
    LastLogin: {
      type: Sequelize.DATETIME,
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

    relationship: {
      type: Sequelize.ENUM(0, 1, 2, 3),
      defaultValue: 0,
    },
    published: {
      type: Sequelize.BOOLEAN,
    },
  });

  return User;
};
