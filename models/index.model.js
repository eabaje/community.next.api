const dbConfig = require("../config/db.config.js");

//const Sequelize = require("sequelize");
// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//   host: dbConfig.HOST,
//   dialect: dbConfig.dialect,
//   operatorsAliases: false,

//   pool: {
//     max: dbConfig.pool.max,
//     min: dbConfig.pool.min,
//     acquire: dbConfig.pool.acquire,
//     idle: dbConfig.pool.idle,
//   },
// });

const env = process.env.NODE_ENV.trim() || "development";

const config = require(__dirname + "/../config/config.json")[env];

//console.log(process.env[config.use_env_variable]);

const isProduction = process.env.NODE_ENV;

const Sequelize = require("sequelize");

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(
    process.env[config.use_env_variable],
    null,
    null,
    config
  );
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.school = require("./school.model.js")(sequelize, Sequelize);
db.place = require("./place.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.userrole = require("./user.role.model.js")(sequelize, Sequelize);
db.userpost = require("./user.post.model.js")(sequelize, Sequelize);
db.userpostlike = require("./user.post.like.model.js")(sequelize, Sequelize);
db.userpostcomment = require("./user.post.comment.model.js")(
  sequelize,
  Sequelize
);
db.userfollower = require("./user.follower.model.js")(sequelize, Sequelize);
db.userfriend = require("./user.friend.model.js")(sequelize, Sequelize);
db.userrelationship = require("./user.relationship.model.js")(
  sequelize,
  Sequelize
);
db.payment = require("./payment.model.js")(sequelize, Sequelize);
db.advert = require("./advert.model.js")(sequelize, Sequelize);
db.review = require("./review.model.js")(sequelize, Sequelize);
db.chat = require("./user.chat.model.js")(sequelize, Sequelize);
db.video = require("./user.video.model.js")(sequelize, Sequelize);

db.relationprimary = require("./relation.model.js")(sequelize, Sequelize);
db.relationsecondary = require("./relation.detail.model.js")(
  sequelize,
  Sequelize
);

db.employer = require("./employer.model.js")(sequelize, Sequelize);
db.group = require("./group.model.js")(sequelize, Sequelize);
db.groupmeta = require("./group.meta.model.js")(sequelize, Sequelize);
db.groupmember = require("./group.member.model.js")(sequelize, Sequelize);
db.groupfollower = require("./group.follower.model.js")(sequelize, Sequelize);
db.grouppost = require("./group.post.model.js")(sequelize, Sequelize);
db.groupmessage = require("./group.message.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "UserRoles",
  foreignKey: "RoleId",
  otherKey: "UserId",
});

db.user.belongsToMany(db.role, {
  through: "UserRoles",
  foreignKey: "UserId",
  otherKey: "RoleId",
});

db.user.hasMany(db.employer, { foreignKey: "UserId" });
db.employer.belongsTo(db.user, { foreignKey: "UserId" });

db.user.hasMany(db.place, { foreignKey: "UserId" });
db.place.belongsTo(db.user, { foreignKey: "UserId" });

db.user.hasMany(db.userpost, { foreignKey: "UserId" });
db.userpost.belongsTo(db.user, { foreignKey: "UserId" });

db.user.hasMany(db.userpostlike, { foreignKey: "UserId" });
db.userpostlike.belongsTo(db.user, { foreignKey: "UserId" });

db.user.hasMany(db.userpostcomment, { foreignKey: "UserId" });
db.userpostcomment.belongsTo(db.user, { foreignKey: "UserId" });

db.userpost.hasMany(db.userpostcomment, { foreignKey: "PostId" });
db.userpostcomment.belongsTo(db.userpost, { foreignKey: "PostId" });

db.userpost.hasMany(db.userpostlike, { foreignKey: "PostId" });
db.userpostlike.belongsTo(db.userpost, { foreignKey: "PostId" });

db.user.hasMany(db.userfriend, { foreignKey: "UserId" });
db.userfriend.belongsTo(db.user, { foreignKey: "UserId" });

db.user.hasMany(db.userfollower, { foreignKey: "UserId" });
db.userfollower.belongsTo(db.user, { foreignKey: "UserId" });

db.user.hasMany(db.school, { foreignKey: "UserId" });
db.school.belongsTo(db.user, { foreignKey: "UserId" });

db.userrelationship.hasMany(db.user, { foreignKey: "FollowedId" });
db.user.belongsTo(db.userrelationship, { foreignKey: "FollowedId" });

db.userrelationship.hasMany(db.user, { foreignKey: "FollowerId" });
db.user.belongsTo(db.userrelationship, { foreignKey: "FollowerId" });

db.user.hasMany(db.relationprimary, { foreignKey: "UserId" });
db.relationprimary.belongsTo(db.user, { foreignKey: "UserId" });

db.relationprimary.hasOne(db.relationsecondary, { foreignKey: "RelationId" });
db.relationsecondary.belongsTo(db.relationprimary, {
  foreignKey: "RelationId",
});

db.user.hasMany(db.group, { foreignKey: "UserId" });
db.group.belongsTo(db.user, { foreignKey: "UserId" });

db.user.hasMany(db.groupmessage, { foreignKey: "UserId" });
db.groupmessage.belongsTo(db.user, { foreignKey: "UserId" });

db.user.hasMany(db.groupfollower, { foreignKey: "UserId" });
db.groupfollower.belongsTo(db.user, { foreignKey: "UserId" });

db.user.hasMany(db.groupmember, { foreignKey: "UserId" });
db.groupmember.belongsTo(db.user, { foreignKey: "UserId" });

db.user.hasMany(db.chat, { foreignKey: "UserId" });
db.chat.belongsTo(db.user, { foreignKey: "UserId" });

db.user.hasMany(db.video, { foreignKey: "UserId" });
db.video.belongsTo(db.user, { foreignKey: "UserId" });

db.user.hasMany(db.payment, { foreignKey: "UserId" });
db.payment.belongsTo(db.user, { foreignKey: "UserId" });

db.user.hasMany(db.advert, { foreignKey: "UserId" });
db.advert.belongsTo(db.user, { foreignKey: "UserId" });

db.user.hasMany(db.review, { foreignKey: "UserId" });
db.review.belongsTo(db.user, { foreignKey: "UserId" });

db.user.hasMany(db.grouppost, { foreignKey: "UserId" });
db.grouppost.belongsTo(db.user, { foreignKey: "UserId" });

db.group.hasOne(db.groupmeta, { foreignKey: "GroupId" });
db.groupmeta.belongsTo(db.group, { foreignKey: "GroupId" });

db.group.hasMany(db.groupfollower, { foreignKey: "GroupId" });
db.groupfollower.belongsTo(db.group, { foreignKey: "GroupId" });

db.group.hasMany(db.groupmember, { foreignKey: "GroupId" });
db.groupmember.belongsTo(db.group, { foreignKey: "GroupId" });

db.group.hasMany(db.groupmessage, { foreignKey: "GroupId" });
db.groupmessage.belongsTo(db.group, { foreignKey: "GroupId" });

// db.company.hasOne(db.user, { foreignKey: "CompanyId" });
// db.user.belongsTo(db.company, { foreignKey: "CompanyId" });

db.ROLES = ["admin", "auditor", "user"];

module.exports = db;
