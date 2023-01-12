const { authJwt } = require("../middleware");
const controller = require("../controllers/event.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  //[verifySignUp.checkDuplicateUsernameOrEmail,verifySignUp.checkRolesExisted],
  app.post("/api/event/addEvent", controller.addEvent);

  app.put("/api/event/updateEvent", controller.updateEvent);

  app.get("/api/event/getAllEvent/:userId?", controller.getAllEvent);
  app.get("/api/event/getAllEventSent/:targetId", controller.getAllEventSent);
  app.get(
    "/api/event/getAllNotificationSent/:targetId?",
    controller.getAllEventSent
  );
  app.get("/api/event/getEvent/:UserEventId", controller.getEvent);

  app.delete("/api/event/deleteEvent/:Id", controller.deleteEvent);
};
