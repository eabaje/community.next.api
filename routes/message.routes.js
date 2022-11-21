const { authJwt } = require("../middleware");
const controller = require("../controllers/message.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  //[verifySignUp.checkDuplicateUsernameOrEmail,verifySignUp.checkRolesExisted],
  app.post("/api/message/addMessage", controller.addMessage);

  app.put("/api/message/updateMessage", controller.updateMessage);

  app.get("/api/message/getAllMessage/:userId?", controller.getAllMessage);
  app.get(
    "/api/message/getAllMessageSent/:targetId?",
    controller.getAllMessageSent
  );

  app.get("/api/message/getMessage/:UserMessageId", controller.getMessage);

  app.delete("/api/message/deleteMessage/:Id", controller.deleteMessage);
};
