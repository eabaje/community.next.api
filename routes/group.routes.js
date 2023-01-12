const { authJwt } = require("../middleware");
const controller = require("../controllers/group.controller");
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

const docuStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("req.body", req.body.CompanyId);
    const { CompanyId } = req.body;

    const dir = `./uploads/${req.body.CompanyId}/document`;
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

const filter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed!"));
  }
};
const memStorage = multer.memoryStorage();
const imageUploader = multer({
  storage,
  // fileFilter: filter,
});

const docUploader = multer({
  storage: docuStorage,
  // fileFilter: filter,
});

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/group/addGroup", controller.addGroup);

  app.post("/api/group/addGroupMember", controller.addGroupMember);

  app.post("/api/group/addGroupMember", controller.addGroupMember);

  app.put("/api/group/updateGroup", controller.updateGroup);

  app.get("/api/group/getAllGroup", controller.getAllGroup);

  app.get("/api/group/getGroup/:groupId", controller.getGroup);

  app.get("/api/group/getAllGroupMember", controller.getAllGroupMember);

  app.get(
    "/api/group/getGroupMember/:groupMemberId",
    controller.getGroupMember
  );

  app.get(
    "/api/group/findAllGroupByDate/:startDate/:endDate",
    controller.findAllGroupByDate
  );

  app.get(
    "/api/group/findAllGroupMemberByDate/:startDate/:endDate",
    controller.findAllGroupMemberByDate
  );

  app.delete("/api/group/deleteGroup/:groupId", controller.deleteGroup);
  app.delete(
    "/api/group/deleteGroupMember/:groupMemberId",
    controller.deleteGroupMember
  );
};
