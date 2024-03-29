const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
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

  // Relation
  app.post("/api/user/addRelation", controller.addRelation);

  app.post("/api/user/updateRelation", controller.updateRelation);

  app.post(
    "/api/user/getAllRelationByCriteria",
    controller.getAllRelationByCriteria
  );

  app.get(
    "/api/user/getRelation/:relationId/:relationType",
    controller.getRelation
  );
  app.get("/api/user/getAllRelation/:userId", controller.getAllRelation);

  app.get(
    "/api/user/getRelationByCategory/:relationId/:relationCategory?",
    controller.getRelationByCategory
  );

  app.get("/api/user/getAllRelationByName", controller.getAllRelationByName);

  app.get(
    "/api/user/getAllRelationByRelationType/:userId/:relationType?",
    controller.getAllRelationByRelationType
  );

  app.get(
    "/api/user/getAllRelationByCategory/:userId/:relationCategory?",
    controller.getAllRelationByCategory
  );

  app.get(
    "/api/user/getAllRelationByLevel/:userId/:level/:relationType?",
    controller.getAllRelationByLevel
  );

  app.delete("/api/user/deleteRelation/:relationId", controller.deleteRelation);

  // ChildOrSibling

  app.post("/api/user/addChildOrSibling", controller.addChildOrSibling);

  app.post("/api/user/updateChildOrSibling", controller.updateChildOrSibling);
  app.get(
    "/api/user/getChildOrSibling/:relationId",
    controller.getChildorSibling
  );

  app.get(
    "/api/user/getAllChildorSibling/:relationType/",
    controller.getAllChildorSibling
  );

  app.delete(
    "/api/user/deleteChildorSibling/:relationId",
    controller.deleteChildorSibling
  );

  //SchoolworkPlace

  app.post("/api/user/addSchoolplacework", controller.addSchoolPlaceWork);

  app.post("/api/user/updateSchoolPlaceWork", controller.updateSchoolPlaceWork);

  app.get(
    "/api/user/getSchoolPlaceWork/:Id/:relationType",
    controller.getSchoolPlaceWork
  );

  app.get(
    "/api/user/getAllSchoolPlaceWork/:userId/:relationType",
    controller.getAllSchoolPlaceWork
  );

  app.delete(
    "/api/user/deleteSchoolPlaceWork/:relationType/:Id",
    controller.deleteSchoolPlaceWork
  );
  //
  app.get(
    "/api/user/getNeighbourhoodByUserId/:userId",
    controller.getNeighbourhoodByUserId
  );

  //User

  app.get("/api/user/findAllUser/:userId", controller.findUser);

  app.get("/api/user/findAllUser", controller.findAllUser);

  app.get("/api/user/findUser/:userId", controller.findUser);

  app.get(
    "/api/user/findAllUserBySearch/:name",
    controller.findAllUserBySearch
  );

  app.get(
    "/api/user/findAllUsersByDate/:startDate/:toDate",
    controller.findAllUsersByDate
  );

  app.put("/api/user/updateUser/:userId", controller.updateUser);

  app.post(
    "/api/user/updateFile",

    imageUploader.single("file"),
    controller.updateFile
  );
  //docUploader.single('file'),
  app.post(
    "/api/user/uploadCompanyDoc",
    docUploader.any(),
    controller.uploadCompanyDoc
  );
  app.post("/api/user/delete", [authJwt.verifyToken], controller.delete);

  app.post("/api/user/deleteAll", controller.deleteAll);

  app.get("/api/user/findRoles", controller.findRoles);

  app.get("/api/user/findUserRoles", controller.findUserRoles);

  app.put("/api/user/updateRole/:roleId", controller.updateRole);

  app.put("/api/user/updateUserRole/:userId", controller.updateUserRole);

  app.delete(
    "/api/user/deleteRole/:roleId",
    [authJwt.verifyToken],
    controller.deleteRole
  );

  // app.post("/api/user/createCompany", controller.createCompany);

  // app.put("/api/user/updateCompany/:companyId", controller.updateCompany);

  // app.post(
  //   "/api/user/company/uploadCompanyDoc",

  //   imageUploader.single("file"),
  //   controller.uploadCompanyDoc
  // );

  // app.post(
  //   "/api/user/company/updateCompanyDoc",

  //   imageUploader.single("file"),
  //   controller.uploadCompanyDoc
  // );

  // app.get("/api/user/findCompany/:companyId", controller.findCompany);

  // app.get("/api/user/findAllCompanys/", controller.findAllCompanys);

  // app.get(
  //   "/api/user/findAllCompanyDoc/:companyId",
  //   controller.findAllCompanyDoc
  // );

  // app.get("/api/user/findCompanyDocById/:docId", controller.findCompanyDocById);

  // app.get(
  //   "/api/user/findAllCompanysByDate/:startDate/:toDate",
  //   controller.findAllCompanysByDate
  // );

  // app.delete("/api/user/deleteCompany/:companyId", controller.deleteCompany);
};
