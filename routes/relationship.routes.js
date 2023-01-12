const { authJwt } = require("../middleware");
const controller = require("../controllers/relationship.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  //[verifySignUp.checkDuplicateUsernameOrEmail,verifySignUp.checkRolesExisted],
  app.post("/api/relationship/addRelationship", controller.addRelationship);

  app.put(
    "/api/relationship/updateRelationship",
    controller.updateRelationship
  );

  app.get(
    "/api/relationship/getAllRelationship",
    controller.getAllRelationship
  );
  app.get(
    "/api/relationship/getAllRelationship/:userId/:type?",
    controller.getAllRelationship
  );
  app.get(
    "/api/relationship/getAllRelationshipByLevel/:userId/:level/:type?",
    controller.getAllRelationshipByLevel
  );

  app.get(
    "/api/relationship/getRelationship/:userRelationId",
    controller.getRelationship
  );

  app.delete(
    "/api/deleteRelationship/:userRelationId",
    controller.deleteRelation
  );
};
