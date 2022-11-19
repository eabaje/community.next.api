const { authJwt } = require("../middleware");
const controller = require("../controllers/advert.controller");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    // console.log('req.body', req.body);
    const { Email, CompanyId } = req.body;

    const dir = `./uploads/${req.body.CompanyId}/profile/${req.body.Email}`;
    fs.exists(dir, (exist) => {
      if (!exist) {
        return fs.mkdir(dir, { recursive: true }, (error) => cb(error, dir));
      }
      // fs.access(dir, fs.F_OK, (err) => {
      //   if (err) {
      //     //  console.error(err)
      //     // return fs.mkdirSync(dir, (error) => cb(error, dir));
      //     return fs.mkdirSync(dir, { recursive: true });
      //   }
      cb(null, dir);
      //file exists
    });
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

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
