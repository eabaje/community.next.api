module.exports = (sequelize, Sequelize) => {
  const UserSecurity = sequelize.define("user_security", {
    UserSecurityId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    // UserId: {
    //   type: Sequelize.STRING,
    // },
    RecoveryEmail: {
      type: Sequelize.STRING,
    },
    RecoveryPhone: {
      type: Sequelize.STRING,
    },
    QuestionOne: {
      type: Sequelize.STRING,
    },
    AnswerOne: {
      type: Sequelize.STRING,
    },
    QuestionTwo: {
      type: Sequelize.STRING,
    },
    AnswerTwo: {
      type: Sequelize.STRING,
    },
    QuestionThree: {
      type: Sequelize.STRING,
    },
    AnswerThree: {
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

  return UserSecurity;
};
