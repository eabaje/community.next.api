require("dotenv").config();
const path = require("path");
var fs = require("fs");
require("../config/nodemailer.config");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models/index.model");

const User = db.user;
const userfollower = db.userfollower;
const userfriend = db.userfriend;
const userpost = db.userpost;
const userrole = db.userrole;
const chat = db.chat;
const employer = db.employer;

const video = db.video;

const relationprimary = db.relationprimary;

const relationsecondary = db.relationsecondary;

const group = db.group;
const groupfollower = db.groupfollower;
const groupmember = db.groupmember;
const groupmessage = db.groupmessage;
const groupmeta = db.groupmeta;
const grouppost = db.grouppost;

const place = db.place;
const school = db.school;
const review = db.review;

// const Company = db.company;
// const CompanyDoc = db.companydoc;

const Role = db.role;
const UserRole = db.userrole;
const Op = db.Sequelize.Op;

// Create and Save a new User

exports.addSpouse = async (req, res) => {
  try {
    const { Email, UserId } = req.body;

    const spouse = await relationprimary.findOne({
      where: { [Op.and]: [{ RelationType: "sp" }, { UserId: UserId }] },
    });

    if (spouse) {
      return res
        .status(404)
        .send({ message: "An error occurred with Role Type Provision" });
    }

    const newSpouse = await relationprimary.create({
      // req.body,
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      MiddleName: req.body.MiddleName,
      Email: req.body.Email.toLowerCase(),
      Age: req.body.Age,
      Sex: req.body.Sex,
      Mobile: req.body.Mobile,
      Address: req.body.Address,
      City: req.body.City,
      State: req.body.State,
      Country: req.body.Country,
      UserId: UserId,

      // UserName: req.body.Email.toLowerCase(),
      // AcceptTerms: req.body.AcceptTerms,
      // PaymentMethod: req.body.PaymentMethod,
      // Currency: req.body.Currency,
      // IsActivated: false,
      // IsConfirmed: false,
    });

    if (newSpouse) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      res
        .status(200)
        .send({ message: "Added Spousal information successfully!" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};

// Spouse or parent or Grandparent etc

exports.addRelation = async (req, res) => {
  try {
    const { Email, UserId, RelationType } = req.body;

    const spouse = await relationprimary.findOne({
      where: { [Op.and]: [{ RelationType: RelationType }, { UserId: UserId }] },
    });

    if (spouse) {
      return res
        .status(200)
        .send({ message: "A record already exists with the information" });
    }

    const newRelation = await relationprimary.create({
      // req.body,
      RelationType: RelationType,
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      MiddleName: req.body.MiddleName,
      NickName: req.body.NickName,
      UserId: UserId,
      createdBy: UserId,
      createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      // UserName: req.body.Email.toLowerCase(),
      // AcceptTerms: req.body.AcceptTerms,
      // PaymentMethod: req.body.PaymentMethod,
      // Currency: req.body.Currency,
      // IsActivated: false,
      // IsConfirmed: false,
    });

    if (newRelation) {
      const newRelationDetail = await relationsecondary.create({
        // req.body,

        Email: req.body.Email.toLowerCase(),
        Age: req.body.Age,
        Sex: req.body.Sex,
        Tribe: req.body.Tribe,
        FamilyName: req.body.FamilyName,
        Language: req.body.Language,
        Kindred: req.body.Kindred,
        Clan: req.body.Clan,
        Mobile: req.body.Mobile,
        Address: req.body.Address,
        City: req.body.City,
        HomeTown: req.body.HomeTown,
        LGA: req.body.LGA,
        State: req.body.State,
        Country: req.body.Country,
        ProfilePicture: req.body.ProfilePicture,
        CoverPicture: req.body.CoverPicture,
        Desc: req.body.Desc,
        UserId: UserId,
        RelationId: newRelation.RelationId,
        createdBy: UserId,
        createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),

        // UserName: req.body.Email.toLowerCase(),
        // AcceptTerms: req.body.AcceptTerms,
        // PaymentMethod: req.body.PaymentMethod,
        // Currency: req.body.Currency,
        // IsActivated: false,
        // IsConfirmed: false,
      });

      if (newRelationDetail) {
        res
          .status(200)
          .send({ message: "Added Relation information successfully!" });
      }
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};

exports.updateRelation = async (req, res) => {
  try {
    const { Email, UserId, RelationId, RelationType } = req.body;

    const spouse = await relationprimary.findOne({
      where: { [Op.and]: [{ RelationType: RelationType }, { UserId: UserId }] },
    });

    if (spouse) {
      return res
        .status(404)
        .send({ message: "An error occurred with Role Type Provision" });
    }

    const newRelation = await relationprimary.update(
      {
        // req.body,
        RelationType: RelationType,
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        MiddleName: req.body.MiddleName,
        NickName: req.body.NickName,
        UserId: UserId,
        updatedBy: UserId,
        updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        where: { RealtionId: RelationId },
      }
    );

    if (newRelation) {
      const newRelationDetail = await relationsecondary.update(
        {
          // req.body,

          Email: req.body.Email.toLowerCase(),
          Age: req.body.Age,
          Sex: req.body.Sex,
          Tribe: req.body.Tribe,
          FamilyName: req.body.FamilyName,
          Language: req.body.Language,
          Kindred: req.body.Kindred,
          Clan: req.body.Clan,
          Mobile: req.body.Mobile,
          Address: req.body.Address,
          City: req.body.City,
          HomeTown: req.body.HomeTown,
          LGA: req.body.LGA,
          State: req.body.State,
          Country: req.body.Country,
          ProfilePicture: req.body.ProfilePicture,
          CoverPicture: req.body.CoverPicture,
          Desc: req.body.Desc,
          UserId: UserId,
          RelationId: newRelation.RelationId,
          updatedBy: UserId,
          updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        },
        {
          where: { RealtionDetailId: newRelation.RelationId },
        }
      );

      if (newRelationDetail) {
        res.status(200).send({ message: "Updated information successfully!" });
      }
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};
exports.getAllRelation = async (req, res) => {
  try {
    const id = req.params.userId;
    const relationType = req.params.relationType;
    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });
    const foundResult = await relationprimary.findAll({
      where: { UserId: id, RelationType: relationType },
      include: [
        {
          model: relationsecondary,
        },
      ],

      order: [["createdAt", "DESC"]],
    });

    if (foundResult) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      return res.status(200).send({ message: "Success", data: foundResult });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};
exports.getRelation = async (req, res) => {
  try {
    const id = req.params.relationId;
    const relationType = req.params.relationType;
    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });
    const foundResult = await relationprimary.findOne({
      where: { RelationId: id, RelationType: relationType },
      include: [
        {
          model: relationsecondary,
        },
      ],

      order: [["createdAt", "DESC"]],
    });

    if (foundResult) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      return res.status(200).send({ message: "Success", data: foundResult });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};

exports.deleteRelation = async (req, res) => {
  try {
    const id = req.params.relationId;

    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });
    const isDeleted = await relationprimary.destroy({
      where: { RelationId: id },
    });

    if (isDeleted) {
      const isDeletedMore = await relationsecondary.destroy({
        where: { RelationId: id },
      });
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      res.status(200).send({ message: "Record has been deleted.!" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};

//************Child Siblings*********************

exports.addChildOrSibling = async (req, res) => {
  try {
    const { Email, UserId, RelationType } = req.body;

    await req.body.child.map((item, index) => {
      const newChildOrSibling = relationprimary.create({
        RelationType: RelationType,
        FirstName: item.FirstName,
        MiddleName: item.MiddleName,
        LastName: item.LastName,
        Nickname: item.Nickname,

        UserId: UserId,
        createdBy: UserId,
        createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        // PurchaseYear: vehicle.Veh
      });

      if (newChildOrSibling)
        return res.status(200).send({
          message: "Added new information successfully!.",
          data: newChildOrSibling,
        });
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};

//Update child sibling
exports.updateChildOrSibling = async (req, res) => {
  try {
    const { Email, UserId, RelationType } = req.body;

    await req.body.child.map((item, index) => {
      const newChildOrSibling = relationprimary.update(
        {
          RelationType: RelationType,
          FirstName: item.FirstName,
          MiddleName: item.MiddleName,
          LastName: item.LastName,
          Nickname: item.Nickname,

          UserId: UserId,
          updatedBy: UserId,
          updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          // PurchaseYear: vehicle.Veh
        },
        { where: { RelationId: item.RelationId } }
      );

      if (parseInt(req.body.child.length) - 1 === parseInt(index))
        return res.status(200).send({
          message: "Updated record successfully!.",
          data: newChildOrSibling,
        });
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};

exports.getAllChildorSibling = async (req, res) => {
  try {
    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });
    const relationType = req.params.relationType;
    const foundRecord = await relationprimary.findAll({
      where: { RelationType: relationType },

      order: [["createdAt", "DESC"]],
    });

    if (foundRecord) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      return res.status(200).send({ message: "Success", data: foundRecord });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};

exports.getChildorSibling = async (req, res) => {
  try {
    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });
    const relationId = req.params.relationId;
    const foundRecord = await relationprimary.findOne({
      where: { RelationId: relationId },

      order: [["createdAt", "DESC"]],
    });

    if (foundRecord) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      return res.status(200).send({ message: "Success", data: foundRecord });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};

exports.deleteChildorSibling = async (req, res) => {
  try {
    const id = req.params.relationId;

    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });
    const isDeleted = await relationprimary.destroy({
      where: { RelationId: id },
    });

    if (isDeleted) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      res.status(200).send({ message: "Record has been deleted.!" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};

// School Place Work

exports.addSchoolPlaceWork = async (req, res) => {
  try {
    const { Email, UserId, RelationType } = req.body;

    await req.body.child.map((item, index) => {
      if (RelationType === "sch") {
        const newSchool = school.create({
          SchoolName: item.SchoolName,
          Address: item.Address,
          City: item.City,
          State: item.State,
          Country: item.Country,
          YearFrom: item.YearFrom,
          YearTo: item.YearTo,
          UserId: UserId,
          // PurchaseYear: vehicle.Veh
        });

        if (newSchool)
          return res.status(200).send({
            message: "Added School information successfully!.",
            data: newSchool,
          });
      } else if (RelationType === "wk") {
        const newEmployer = employer.create({
          CompanyName: item.CompanyName,
          Address: item.Address,
          City: item.City,
          State: item.State,
          Country: item.Country,
          YearFrom: item.YearFrom,
          YearTo: item.YearTo,
          UserId: UserId,
          // PurchaseYear: vehicle.Veh
        });
        if (newEmployer)
          return res.status(200).send({
            message: "Added work information successfully!.",
            data: newEmployer,
          });
      } else {
        const newPlace = place.create({
          NeighbourhoodName: item.NeighbourhoodName,
          Address: item.Address,
          City: item.City,
          State: item.State,
          Country: item.Country,
          YearFrom: item.YearFrom,
          YearTo: item.YearTo,
          UserId: UserId,
          // PurchaseYear: vehicle.Veh
        });
        if (newPlace)
          return res.status(200).send({
            message: "Added place(s) of residence history successfully!.",
            data: newPlace,
          });
      }
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};

exports.updateSchoolPlaceWork = async (req, res) => {
  try {
    const { Email, UserId, RelationType } = req.body;

    await req.body.child.map((item, index) => {
      if (RelationType === "sch") {
        const updateSchool = school.update(
          {
            SchoolName: item.SchoolName,
            Address: item.Address,
            City: item.City,
            State: item.State,
            Country: item.Country,
            YearFrom: item.YearFrom,
            YearTo: item.YearTo,
            UserId: UserId,
            // PurchaseYear: vehicle.Veh
          },
          { where: { RelationId: item.SchoolId } }
        );

        if (updateSchool)
          return res.status(200).send({
            message: "Added School information successfully!.",
            data: updateSchool,
          });
      } else if (RelationType === "wk") {
        const newEmployer = employer.update(
          {
            CompanyName: item.CompanyName,
            Address: item.Address,
            City: item.City,
            State: item.State,
            Country: item.Country,
            YearFrom: item.YearFrom,
            YearTo: item.YearTo,
            UserId: UserId,
            // PurchaseYear: vehicle.Veh
          },
          { where: { EmployerId: item.EmployerId } }
        );
        if (newEmployer)
          return res.status(200).send({
            message: "Added work information successfully!.",
            data: newEmployer,
          });
      } else {
        const newPlace = place.update(
          {
            NeighbourhoodName: item.NeighbourhoodName,
            Address: item.Address,
            City: item.City,
            State: item.State,
            Country: item.Country,
            YearFrom: item.YearFrom,
            YearTo: item.YearTo,
            UserId: UserId,
            // PurchaseYear: vehicle.Veh
          },
          { where: { PlaceLivedId: item.PlaceLivedId } }
        );
        if (newPlace)
          return res.status(200).send({
            message: "Added place(s) of residence history successfully!.",
            data: newPlace,
          });
      }
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};

exports.getAllSchoolPlaceWork = async (req, res) => {
  try {
    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });
    const id = req.params.userId;
    const relationType = req.params.relationType;
    let foundRecord = null;
    if (relationType === "sch") {
      foundRecord = await school.findAll({
        where: { UserId: id },
        include: [
          {
            model: User,
          },
        ],

        order: [["createdAt", "DESC"]],
      });
    } else if (relationType === "wk") {
      foundRecord = await employer.findAll({
        where: { UserId: id },
        include: [
          {
            model: User,
          },
        ],

        order: [["createdAt", "DESC"]],
      });
    } else {
      foundRecord = await place.findAll({
        where: { UserId: id },
        include: [
          {
            model: User,
          },
        ],

        order: [["createdAt", "DESC"]],
      });
    }

    if (foundRecord) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      return res.status(200).send({ message: "Success", data: foundRecord });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};

exports.getSchoolPlaceWork = async (req, res) => {
  try {
    const RelationType = req.params.relationType;

    const Id = req.params.Id;
    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });
    let foundRecord = null;
    if (RelationType === "sch") {
      foundRecord = await school.findOne({
        where: { SchoolId: Id },
        include: [
          {
            model: User,
          },
        ],

        order: [["createdAt", "DESC"]],
      });
    } else if (RelationType === "wk") {
      foundRecord = await employer.findOne({
        where: { Employer: Id },
        include: [
          {
            model: User,
          },
        ],

        order: [["createdAt", "DESC"]],
      });
    } else {
      foundRecord = await place.findOne({
        where: { PlaceLived: Id },
        include: [
          {
            model: User,
          },
        ],

        order: [["createdAt", "DESC"]],
      });
    }

    if (foundRecord) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      return res.status(200).send({ message: "Success", data: foundRecord });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};

exports.deleteSchoolPlaceWork = async (req, res) => {
  try {
    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });

    const RelationType = req.params.relationType;

    const Id = req.params.Id;

    let isDeleted = null;
    if (RelationType === "sch") {
      isDeleted = await school.destroy({
        where: { SchoolId: Id },
      });
    } else if (RelationType === "wk") {
      isDeleted = await employer.destroy({
        where: { Employer: Id },
      });
    } else {
      isDeleted = await place.destroy({
        where: { PlaceLived: Id },
      });
    }

    if (isDeleted) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      res.status(200).send({ message: "Record has been deleted.!" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};

//User

// Retrieve all Users from the database.
exports.findAllUser = (req, res) => {
  // const name = req.params.name;
  //var condition = name ? { FullName: { [Op.iLike]: `%${name}%` } } : null;{ where: condition }

  User.findAll({
    include: [
      // {
      //   model: Company,
      // },
      {
        model: Role,
        attributes: ["Name"],
      },
    ],

    order: [["createdAt", "DESC"]],
  })
    .then((data) => {
      res.status(200).send({
        message: "Success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users.",
      });
    });
};

exports.findAllUserBySearch = (req, res) => {
  const name = req.params.name;
  var condition = name ? { FullName: { [Op.iLike]: `%${name}%` } } : null;

  User.findAll({
    where: condition,
    include: [
      {
        model: Role,
        attributes: ["Name"],
      },
    ],

    order: [["createdAt", "DESC"]],
  })
    .then((data) => {
      res.status(200).send({
        message: "Success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users.",
      });
    });
};

// Find a single User with an id
exports.findUser = (req, res) => {
  const id = req.params.userId;

  User.findOne({
    where: { UserId: id },
    include: [
      {
        model: Role,
        attributes: ["Name"],
      },

     
    ],
    order: [["createdAt", "DESC"]],
  })
    .then((data) => {
      res.status(200).send({
        message: "Success",
        data: data,
      });
    })
    .catch((err) => {
      console.log("err", err);
      res.status(500).send({
        message: "Error retrieving User with UserId=" + id,
      });
    });
};

// Update a User by the id in the request
exports.updateUser = (req, res) => {
  const id = req.body.UserId;

  const imagePath = req.file.filename;

  User.update(req.body, {
    where: { UserId: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};

exports.updateUserRole = (req, res) => {
  const id = req.body.UserId;

  UserRole.update(req.body, {
    where: { UserId: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User Role was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update User Role with id=${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};

exports.updateFile = (req, res) => {
  // console.log('req.body.UserId', req.body.UserId);
  User.findOne({
    where: {
      UserId: req.body.UserId,
    },
  }).then((user) => {
    if (user) {
      console.log("user", user);
      const uploadFile = req.file ? req.file : null;

      const picpath = uploadFile
        ? `${user.CompanyId}/${user.Email}/${uploadFile.originalname}`
        : "";

      var condition =
        req.body.FileType === "image"
          ? { UserPicUrl: picpath }
          : { UserPicUrl: picpath };
      console.log("condition", condition);
      User.update(condition, {
        where: { UserId: req.body.UserId },
      })
        .then((num) => {
          if (num == 1) {
            res.send({
              message: "File uploaded successfully.",
            });
          } else {
            res.send({
              message: `Cannot update Driver with id=${id}. Maybe Driver was not found or req.body is empty!`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error updating Driver with id=" + id,
          });
        });
    } else {
      res.status(500).send({
        message: "Error updating the record",
      });
    }
  });

  // const dir = `./uploads/${req.body.CompanyId}/${req.body.Email}`;
  // fs.exists(dir, (exist) => {
  //   if (!exist) {
  //     return fs.mkdir(dir, { recursive: true }, (err, info) => {
  //          console.log(err);
  //         });
  //   }
  // });
};

exports.changeImageProfile = async (req, res = response) => {
  try {
    const imagePath = req.file.filename;

    const imagedb = await pool.query("SELECT image FROM person WHERE uid = ?", [
      req.uid,
    ]);

    await fs.unlink(path.resolve("src/Uploads/Profile/" + imagedb[0].image));

    await pool.query("UPDATE person SET image = ? WHERE uid = ?", [
      imagePath,
      req.uid,
    ]);

    res.json({
      resp: true,
      msg: "Picture changed",
    });
  } catch (e) {
    return res.status(500).json({
      resp: false,
      msg: e,
    });
  }
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.UserId;

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Users.",
      });
    });
};

// find all  User by date
exports.findAllUsersByDate = (req, res) => {
  const startDate = req.params.startDate;
  const endDate = req.params.endDate;

  User.findAll({
    where: {
      createdAt: {
        [Op.between]: [new Date(Date(startDate)), new Date(Date(endDate))],
      },
    },
    include: [
      {
        model: Role,
        attributes: ["Name"],
      },
    ],

    order: [["createdAt", "DESC"]],
  })
    .then((data) => {
      res.status(200).send({
        message: "Success",
        data: data,
      });
    })

    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users.",
      });
    });
};

//get Roles

exports.findRoles = (req, res) => {
  const name = req.params.name;
  var condition = name ? { Name: { [Op.iLike]: `%${name}%` } } : null;

  Role.findAll({ where: condition })
    .then((data) => {
      res.status(200).send({
        message: "Success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users.",
      });
    });
};

exports.findUserRoles = (req, res) => {
  const userId = req.params.userId;
  var condition = userId ? { UserId: userId } : null;

  UserRole.findAll({ where: condition })
    .then((data) => {
      res.status(200).send({
        message: "Success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users.",
      });
    });
};

exports.updateRole = (req, res) => {
  const id = req.params.roleId;

  Role.update(req.body, {
    where: { RoleId: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Role was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Role with id=${id}. Maybe Company was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Role with id=" + id,
      });
    });
};

exports.deleteRole = (req, res) => {
  const id = req.params.roleId;

  Role.destroy({
    where: { RoleId: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Role was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Role with id=${id}. Maybe Company was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Role with id=" + id,
      });
    });
};

exports.uploadCompanyDoc = async (req, res) => {
  // const { filename: image } = req.file;
  //   const RefId = req.body.RefId;
  //   const uploadUrl = req.body.uploadUrl;

  // const dir = `./uploads/${req.body.CompanyId}/document`;
  const dir = `${process.env.UPLOADS_URL}/${req.body.CompanyId}/document`;
  fs.exists(dir, (exist) => {
    if (!exist) {
      return fs.mkdir(dir, { recursive: true }, (err, info) => {
        console.log(err);
      });
    }
  });
  //   // const dir = `${process.env.UPLOADS_URL}/${UploadType}/${RefId}`;

  try {
    console.log("req", req);
    // req.body.document.map((document, index) => {
    //   console.log('document', JSON.parse(document.DocTitle));
    // });
    // for (const doc of req.body.document) {
    //   console.log('document', doc.DocTitle);
    // }
    await req.files.map((file, index) => {
      console.log("index", index);
      const companyDoc = {
        RefId: req.body.RefId,
        DocTitle: req.body.DocTitle[index],
        DocName: file.originalname,
        DocType: req.body.DocType[index],
        DocUrl: `${dir}/${file.originalname}`,
      };

      //const newCompanyDoc = CompanyDoc.create(companyDoc);
    });

    //  const picName = req.file.fieldname + '-' + Date.now();
    //  const picurl = picName + path.extname(req.file.originalname);

    return res.status(200).send({
      message: "Success",
    });
  } catch (error) {
    console.log(`An error occurred during processing: ${error.message}`);
  }
};
