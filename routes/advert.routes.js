const { authJwt } = require("../middleware");
const controller = require("../controllers/advert.controller");
// var passportFacebook = require('../middleware/facebook');
// var passportGoogle = require('../middleware/google');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  //[verifySignUp.checkDuplicateUsernameOrEmail,verifySignUp.checkRolesExisted],
  // Relation
  app.post("/api/advert/addadvert", controller.addAdvert);

  app.put("/api/advert/updateAdvert/:advertId", controller.updateAdvert);

  app.get("/api/advert/getAdvert/:advertId", controller.getAdvert);

  app.get("/api/advert/getAllAdvert", controller.getAllAdvert);

  app.delete("/api/advert/deleteAdvert/:advertId", controller.deleteAdvert);

  //  app.get('/api/auth/facebook',passportFacebook.authenticate('facebook'));

  // app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email,user_photos' }));

  // app.get('/api//facebook/callback',passport.authenticate('facebook', {successRedirect : '/profile',failureRedirect : '/'}));
};
