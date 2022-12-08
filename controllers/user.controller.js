require("dotenv").config();
const path = require("path");
var fs = require("fs");
require("../config/nodemailer.config");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models/index.model");
const moment = require("moment/moment");
const { LevelMap } = require("../enum");

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

// Spouse or parent or Grandparent etc

exports.addRelation = async (req, res) => {
  try {
    const { Email, UserId, Level, RelationId } = req.body;
    let cnt = 0;
    req.body.objItem.map(async (item, index) => {
      const isRecord = await relationprimary.findOne({
        where: { RelationId: item?.RelationId ? item?.RelationId : null },
      });
      //&& item?.RelationId && parseInt(item?.RelationId) > 0
      console.log("isRecord", isRecord);
      if (isRecord) {
        //update relation
        const spt =
          item.RelationType.indexOf(",") > 0 && item.RelationType.split(",");

        const objStr = {
          RelationType:
            item.RelationType.indexOf(",") < 1 ? item.RelationType : spt[1],
          RelationCategory: item.RelationCategory,
          FirstName: item.FirstName,
          LastName: item.LastName,
          MiddleName: item.MiddleName,
          NickName: item.NickName,
          Level: item?.Level ? item?.Level : spt[0],
          UserId: UserId,
          updatedBy: UserId,
          updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        };
        console.log("objStr", objStr);

        const newRelation = await relationprimary.update(objStr, {
          where: { RelationId: item.RelationId },
        });

        const found2 = await relationsecondary.findOne({
          where: { RelationId: item.RelationId },
        });
        const newRelationDetail = await relationsecondary.update(
          {
            // req.body,

            RelationDetailId: found2.RelationDetailId,
            Email: item?.Email?.toLowerCase(),
            Age: item?.Age,
            DOB: item?.DOB,
            Sex: item?.Sex,
            Title: item?.Title,
            Tribe: item?.Tribe,
            FamilyName: item.FamilyName,
            Language: item.Language,
            Kindred: item.Kindred,
            Clan: item.Clan,
            Occupation: item.Occupation,
            EmploymentStatus: item.EmploymentStatus,
            MaritalStatus: item.MaritalStatus,
            BloodGroup: item.BloodGroup,
            Mobile: item.Mobile,
            Address: item.Address,
            City: item.City,
            HomeTown: item.HomeTown,
            LGA: item.LGA,
            State: item.State,
            Country: item.Country,
            ProfilePicture: item.ProfilePicture,
            CoverPicture: item.CoverPicture,
            Desc: item.Desc,
            UserId: UserId,
            RelationId: newRelation.RelationId,
            updatedBy: UserId,
            updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          },
          {
            where: { RelationDetailId: found2.RelationDetailId },
          }
        );

        //update reference user with relation type
        console.log("newRelation", newRelation);
        let rLevel = 0;
        spt[1] === "child"
          ? (rLevel = parseInt(spt[0]) + 1)
          : spt[1] === "sibling"
          ? (rLevel = parseInt(spt[0]))
          : spt[1] === "spouse"
          ? (rLevel = parseInt(spt[0]))
          : spt[1] === "parent"
          ? (rLevel = parseInt(spt[0]) - 1)
          : (rLevel = parseInt(spt[0]) - 1);

        console.log("rLevel", rLevel);
        const foundRef = await relationprimary.findOne({
          where: {
            UserId: UserId,
            Level: rLevel,
            RelationId: item?.RefId,
          },
        });
        console.log("spt[1]", spt[1]);
        switch (spt[1]) {
          case "parent":
            foundRef.Parent = foundRef.Parent
              ? foundRef.Parent + "," + item?.RelationId
              : item?.RelationId;

            foundRef.save();
            console.log(
              "Parent",
              foundRef.Parent
                ? foundRef.Parent + "," + item?.RelationId
                : item?.RelationId
            );
            return;
          case "spouse":
            foundRef.Partner = item?.RelationId;
            foundRef.save();
            console.log("Spouse", "here");
            return;
          case "sibling":
            foundRef.Sibling = item?.RelationId;
            foundRef.save();
            console.log("Sibling", "here");
            return;
          case "child":
            foundRef.Child = item?.RelationId;
            foundRef.save();
            console.log("Child", "here");
            return;
          default:
            foundRef.Child = item?.RelationId;
            foundRef.save();
            console.log("Default", "here");
        }

        if (newRelation) cnt++;

        if (cnt === req.body.objItem.length)
          return res.status(200).send({
            message: "Updated Family/Relation information successfully!",
          });
      } else {
        //create new relation data

        const spt =
          item.RelationType.indexOf(",") > 0 && item.RelationType.split(",");
        const unewRelation = {
          RelationType: item.RelationType ? item.RelationType : spt[1],
          RelationCategory: item.RelationCategory,
          FirstName: item.FirstName,
          LastName: item.LastName,
          MiddleName: item.MiddleName,
          NickName: item.NickName,
          Level: item?.Level ? item?.Level : spt[0],
          UserId: UserId,
          createdBy: UserId,
          createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        };
        console.log("unewRelation", unewRelation);
        const newRelation = await relationprimary.create(unewRelation);

        if (newRelation) {
          const newRelationDetail = await relationsecondary.create({
            // req.body,

            Email: item?.Email?.toLowerCase(),
            Age: item.Age,
            Sex: item.Sex,
            DOB: item.DOB,
            Title: item.Title,
            Tribe: item.Tribe,
            FamilyName: item.FamilyName,
            Language: item.Language,
            Kindred: item.Kindred,
            Clan: item.Clan,
            Occupation: item.Occupation,
            EmploymentStatus: item.EmploymentStatus,
            MaritalStatus: item.MaritalStatus,
            BloodGroup: item.BloodGroup,
            Mobile: item.Mobile,
            Address: item.Address,
            City: item.City,
            HomeTown: item.HomeTown,
            LGA: item.LGA,
            State: item.State,
            Country: item.Country,
            ProfilePicture: item.ProfilePicture,
            CoverPicture: item.CoverPicture,
            Desc: item.Desc,

            RelationId: newRelation.RelationId,
            createdBy: UserId,
            createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });

          //update reference user with relation type

          const foundRef = await relationprimary.findOne({
            where: { UserId: UserId, Level: parseInt(newRelation.Level) - 1 },
          });

          switch (newRelation.RelationType) {
            case "parent":
              foundRef.Parent = foundRef.Parent
                ? foundRef.Parent + "," + newRelation.RelationId
                : newRelation.RelationId;
              foundRef.save();
            case "spouse":
              foundRef.Partner = newRelation.RelationId;
              foundRef.save();
            case "sibling":
              foundRef.Sibling = newRelation.RelationId;
              foundRef.save();
            case "child":
              foundRef.Child = newRelation.RelationId;
              foundRef.save();

            default:
              foundRef.Child = newRelation.RelationId;
              foundRef.save();
          }
          // const refCol = LevelMap.find(
          //   (e) => e.text === newRelation.relationType
          // ).value;

          // var updateStm = { refCol: newRelation.RelationId };

          // const newRef = await relationprimary.update(updateStm, {
          //   where: { UserId: UserId, Level: parseInt(newRelation.Level) - 1 },
          // });

          if (newRelation) cnt++;

          if (cnt === req.body.objItem.length)
            return res.status(200).send({
              message: "Added Family/Relation information successfully!",
            });
        }
      }
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      message:
        error.message || "Something went wrong. Sorry we'll try to fix it.",
    });
  }
};

exports.getAllRelation = async (req, res) => {
  try {
    const id = req.params.userId;
    const relationType = req.params.relationType;

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
      message:
        error.message || "Something went wrong. Sorry we'll try to fix it.",
    });
  }
};

exports.getAllRelationByCategory = async (req, res) => {
  try {
    const id = req.params.userId;
    const relationCategory = req.params.relationCategory;

    const foundResult = await relationprimary.findAll({
      where: { UserId: id, RelationCategory: relationCategory },
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
      message:
        error.message || "Something went wrong. Sorry we'll try to fix it.",
    });
  }
};

exports.getAllRelationByLevel = async (req, res) => {
  try {
    const id = req.params.userId;
    const relationType = req.params.relationType;
    const level = req.params.level;
    //RelationType: relationType,
    const foundResult = await relationprimary.findAll({
      where: { UserId: id, Level: level },
      include: [
        {
          model: relationsecondary,
        },
      ],

      order: [["createdAt", "ASC"]],
    });

    if (foundResult) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      return res.status(200).send({ message: "Success", data: foundResult });
    }
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Something went wrong. Sorry we'll try to fix it.",
    });
  }
};

exports.getRelationByCategory = async (req, res) => {
  try {
    const id = req.params.userId;
    const relationCategory = req.params.relationCategory;

    const foundResult = await relationprimary.findOne({
      where: { UserId: id, RelationCategory: relationCategory },
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
      message:
        error.message || "Something went wrong. Sorry we'll try to fix it.",
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
      message:
        error.message || "Something went wrong. Sorry we'll try to fix it.",
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
      message:
        error.message || "Something went wrong. Sorry we'll try to fix it.",
    });
  }
};

//************Child Siblings*********************

exports.addChildOrSibling = async (req, res) => {
  try {
    const { Email, UserId, RelationType } = req.body;
    let updateSChildOrSibling = null;

    await req.body.objItem.map((item, index) => {
      const ChildOrSibling = {
        RelationType: RelationType,
        FirstName: item.FirstName,
        MiddleName: item.MiddleName,
        LastName: item.LastName,
        NickName: item.NickName,
        UserId: UserId,
        createdBy: UserId,
        createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        // PurchaseYear: vehicle.VehicleType,
      };

      const uChildOrSibling = {
        RelationType: RelationType,
        RelationId: item.RelationId,
        FirstName: item.FirstName,
        MiddleName: item.MiddleName,
        LastName: item.LastName,
        NickName: item.NickName,
        UserId: UserId,
        createdBy: UserId,
        createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        // PurchaseYear: vehicle.VehicleType,
      };

      console.log("ChildOrSibling", ChildOrSibling);
      if (parseInt(item.RelationId) > 0) {
        updateSChildOrSibling = relationprimary.update(uChildOrSibling);
      } else {
        const newSChildOrSibling = relationprimary.create(ChildOrSibling);

        //update parent database
        updateSChildOrSibling = relationprimary.update(
          { Children: newSChildOrSibling.RelationId },
          { where: { userId: UserId, Level: "0" } }
        );
      }
    });

    return res.status(200).send({
      message: updateSChildOrSibling
        ? "Updated information successfully!."
        : "Added information successfully!",
      // data: newChildOrSibling,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      message:
        error.message || "Something went wrong. Sorry we'll try to fix it.",
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
      message:
        error.message || "Something went wrong. Sorry we'll try to fix it.",
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
      message:
        error.message || "Something went wrong. Sorry we'll try to fix it.",
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
      message:
        error.message || "Something went wrong. Sorry we'll try to fix it.",
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
      message:
        error.message || "Something went wrong. Sorry we'll try to fix it.",
    });
  }
};

// School Place Work

exports.addSchoolPlaceWork = async (req, res) => {
  try {
    const { Email, UserId, RelationType } = req.body;

    let cnt = 0;
    req.body.objItem.map(async (item, index) => {
      if (RelationType === "school") {
        // get school Id with userId

        const foundRecord = await school.findOne({
          where: { SchoolId: item?.SchoolId },
        });

        if (foundRecord) {
          const schoolRecord = await school.update(
            {
              SchoolName: item.SchoolName,
              Address: item.Address,
              City: item.City,
              HomeTown: item.HomeTown,
              State: item.State,
              Country: item.Country,
              YearFrom: item.YearFrom,
              YearTo: item.YearTo,
              UserId: UserId,
              // PurchaseYear: vehicle.Veh
            },
            { where: { SchoolId: item?.SchoolId } }
          );

          schoolRecord && cnt++;

          if (cnt === req.body.objItem.length)
            return res.status(200).send({
              message: "Updated School information successfully!.",
              data: schoolRecord,
            });
        } else {
          const newSchool = await school.create({
            SchoolName: item.SchoolName,
            Address: item.Address,
            City: item.City,
            HomeTown: item.HomeTown,
            State: item.State,
            Country: item.Country,
            YearFrom: item.YearFrom,
            YearTo: item.YearTo,
            UserId: UserId,
            // PurchaseYear: vehicle.Veh
          });

          newSchool && cnt++;
          if (cnt === req.body.objItem.length)
            return res.status(200).send({
              message: "Added School information successfully!.",
              data: newSchool,
            });
        }
      } else if (RelationType === "work") {
        const foundRecord = await employer.findOne({
          where: { EmployerId: item?.EmployerId },
        });

        if (foundRecord) {
          const employerRecord = await employer.update(
            {
              CompanyName: item.CompanyName,
              Address: item.Address,
              City: item.City,
              HomeTown: item.HomeTown,
              State: item.State,
              Country: item.Country,
              YearFrom: item.YearFrom,
              YearTo: item.YearTo,
              UserId: UserId,
              // PurchaseYear: vehicle.Veh
            },
            { where: { EmployerId: item?.EmployerId } }
          );

          employerRecord && cnt++;

          if (cnt === req.body.objItem.length)
            return res.status(200).send({
              message: "Updated Work information successfully!.",
              data: employerRecord,
            });
        } else {
          const newEmployer = await employer.create({
            CompanyName: item.CompanyName,
            Address: item.Address,
            City: item.City,
            HomeTown: item.HomeTown,
            State: item.State,
            Country: item.Country,
            YearFrom: item.YearFrom,
            YearTo: item.YearTo,
            UserId: UserId,
            // PurchaseYear: vehicle.Veh
          });

          newEmployer && cnt++;

          if (cnt === req.body.objItem.length)
            return res.status(200).send({
              message: "Added Work information successfully!.",
              data: newEmployer,
            });
        }
      } else {
        const foundRecord = await place.findOne({
          where: { PlaceLivedId: item?.PlaceLivedId },
        });

        if (foundRecord) {
          const placeRecord = await place.update(
            {
              NeighborhoodName: item.NeighborhoodName,
              Address: item.Address,
              City: item.City,
              HomeTown: item.HomeTown,
              State: item.State,
              Country: item.Country,
              YearFrom: item.YearFrom,
              YearTo: item.YearTo,
              UserId: UserId,
              // PurchaseYear: vehicle.Veh
            },
            { where: { PlaceLivedId: item?.PlaceLivedId } }
          );

          placeRecord && cnt++;

          if (cnt === req.body.objItem.length)
            return res.status(200).send({
              message: "Updated your neighbourhood information successfully!.",
              data: placeRecord,
            });
        } else {
          const newPlace = await place.create({
            NeighborhoodName: item.NeighborhoodName,
            Address: item.Address,
            City: item.City,
            State: item.State,
            Country: item.Country,
            YearFrom: item.YearFrom,
            YearTo: item.YearTo,
            UserId: UserId,
            // PurchaseYear: vehicle.Veh
          });

          newPlace && cnt++;

          if (cnt === req.body.objItem.length)
            return res.status(200).send({
              message: "Added neighbourhood information successfully!.",
              data: newPlace,
            });
        }
      }
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Something went wrong. Sorry we'll try to fix it.",
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
      message:
        error.message || "Something went wrong. Sorry we'll try to fix it.",
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
    if (relationType === "school") {
      foundRecord = await school.findAll({
        where: { UserId: id },
        include: [
          {
            model: User,
          },
        ],

        order: [["createdAt", "DESC"]],
      });
    } else if (relationType === "work") {
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
      message:
        error.message || "Something went wrong. Sorry we'll try to fix it.",
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
      message:
        error.message || "Something went wrong. Sorry we'll try to fix it.",
    });
  }
};

exports.getNeighbourhoodByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });

    let dt = null;
    const arrCountry = [];
    const arrState = [];
    const arrCity = [];
    const arrAddress = [];
    dt = await place.findAll({
      where: { UserId: userId },
      attributes: ["PlaceLivedId", "Country", "State", "City", "Address"],
      order: [["createdAt", "DESC"]],
    });

    dt?.map((objItem) => {
      arrCountry.append(objItem.Country);
      arrState.append(objItem.State);
      arrCity.append(objItem.City);
      arrAddress.append(objItem.Address);
    });

    const dtPlace = await place.findAll({
      where: {
        Country: {
          [Op.contains]: arrCountry, //<- array of Country
        },
        State: {
          [Op.contains]: arrState, //<- array of State
        },
        City: {
          [Op.contains]: arrCity, //<- array of City
        },
        Address: {
          [Op.contains]: arrAddress, //<- array of Address
        },
      },
      attributes: [
        "PlaceLivedId",
        "Country",
        "State",
        "City",
        "Address",
        "YearFrom",
        "YearTo",
      ],
      include: [
        {
          model: User,
          attributes: ["UserId", "FirstName", "LastName", "MiddleName"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    if (dtPlace) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      return res.status(200).send({ message: "Success", data: dtPlace });
    }
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Something went wrong. Sorry we'll try to fix it.",
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
      message:
        error.message || "Something went wrong. Sorry we'll try to fix it.",
    });
  }
};

//Search neighbourhood

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
    // include: [
    //   {
    //     model: Role,
    //     attributes: ["Name"],
    //   },
    // ],
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
        message: err.message || "Error retrieving User with UserId=" + id,
      });
    });
};

// Update a User by the id in the request
exports.updateUser = async (req, res) => {
  const id = req.body.UserId;

  // const imagePath = req.file.filename;
  try {
    const num = await User.update(req.body, {
      where: { UserId: id },
    });

    if (num == 1) {
      const foundResult = await relationprimary.findOne({
        attributes: ["RelationId"],
        where: { UserId: id, Level: "0" },
        include: [
          {
            model: relationsecondary,
            attributes: ["Sex"],
            where: { Sex: req.body.Sex },
          },
        ],
      });

      if (foundResult === null) {
        console.log("foundResult", foundResult);
        const unewRelation = {
          RelationType: req.body.RelationType,
          RelationCategory: req.body.RelationCategory,
          FirstName: req.body.FirstName,
          LastName: req.body.LastName,
          MiddleName: req.body.MiddleName,
          NickName: req.body.NickName,
          Level: req.body.Level,
          Type: req.body.RelationType,
          UserId: id,
          createdBy: id,
          createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          // PurchaseYear: vehicle.VehicleType,
        };

        const newRelation = await relationprimary.create(unewRelation);

        if (newRelation) {
          const newRelationDetail = await relationsecondary.create({
            // req.body,

            Email: req.body.Email.toLowerCase(),
            Age: req.body.Age,
            Sex: req.body.Sex,
            DOB: item.DOB,
            MaritalStatus: req.body.MaritalStatus,
            EmploymentStatus: req.body.EmploymentStatus,
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

            Occupation: req.body.Occupation,
            RelationId: newRelation.RelationId,
            createdBy: req.body.UserId,
            createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),

            // UserName: req.body.Email.toLowerCase(),
            // AcceptTerms: req.body.AcceptTerms,
            // PaymentMethod: req.body.PaymentMethod,
            // Currency: req.body.Currency,
            // IsActivated: false,
            // IsConfirmed: false,
          });
        }
      } else {
        const newRelation = await relationprimary.update(
          {
            // req.body,
            RelationType: req.body.RelationType,
            RelationCategory: req.body.RelationCategory,
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            MiddleName: req.body.MiddleName,
            NickName: req.body.NickName,
            Level: req.body.Level,
            Type: req.body.RelationType,
            updatedBy: req.body.UserId,
            updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          },
          {
            where: { RelationId: foundResult.RelationId },
          }
        );

        if (newRelation) {
          const found2 = await relationsecondary.findOne({
            attributes: ["RelationDetailId"],
            where: { RelationId: foundResult.RelationId },
          });
          console.log("found2", found2);
          const newRelationDetail = await relationsecondary.update(
            {
              // req.body,
              RelationDetailId: found2.RelationDetailId,
              Email: req.body.Email.toLowerCase(),
              Age: req.body.Age,
              Sex: req.body.Sex,
              DOB: item.DOB,
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
              MaritalStatus: req.body.MaritalStatus,
              EmploymentStatus: req.body.EmploymentStatus,
              Occupation: req.body.Occupation,
              RelationId: newRelation.RelationId,
              updatedBy: req.body.UserId,
              updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
              where: { RelationDetailId: found2.RelationDetailId },
            }
          );

          if (newRelationDetail) {
            res
              .status(200)
              .send({ message: "Updated information successfully!" });
          }
          // return res.status(200).json({
          //   message: "Registration Link Sent",
          // });
        }
      }
    } else {
      res.send({
        message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error updating User with id=" + id,
    });
  }
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
