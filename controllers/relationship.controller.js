require("dotenv").config();
const path = require("path");
var fs = require("fs");
require("../config/nodemailer.config");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models/index.model");
const moment = require("moment/moment");

const user = db.user;
const userfollower = db.userfollower;
const friend = db.friend;
const userfriend = db.userfriend;

const relationship = db.userrelationship;

const userpostlike = db.userpostlike;
const userpostcomment = db.userpostcomment;
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

//User Relationship

exports.addRelationship = async (req, res) => {
  try {
    const { UserId } = req.body;

    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });

    const newRecord = await relationship.create({
      // req.body.,
      SourceId: UserId,
      TargetId: req.body.RelationshipId,
      Type: req.body.Type,

      createdBy: UserId,
      createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),

      UserId: UserId,
    });

    if (newRecord) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      res.status(200).send({ message: "New Relationship has been created.!" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};

exports.updateRelationship = async (req, res) => {
  try {
    const { UserId, UserRelationId } = req.body;

    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });
    const updateRecord = await relationship.update(
      {
        SourceId: UserId,
        TargetId: req.body.UserRelationId,
        Type: req.body.Type,

        updatedBy: UserId,
        updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),

        UserId: UserId,
      },
      {
        where: { UserRelationId: req.body.UserRelationId },
      }
    );

    if (updateRecord) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      res.status(200).send({ message: "Relationship has been updated.!" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};

exports.deleteRelationship = async (req, res) => {
  try {
    const id = req.params.Id;

    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });
    const deletedRecord = await relationship.destroy({
      where: { UserRelationId: id },
    });

    if (deletedRecord) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      res.status(200).send({ message: "Relationship has been deleted.!" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};
//get all Relationship
exports.getAllRelationship = async (req, res) => {
  try {
    const type = req.params.type;
    var condition = type ? { Type: { [Op.iLike]: `%${type}%` } } : null;

    const result = await relationship.findAll({
      where: condition,
      include: [
        {
          model: user,
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    if (result) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      return res.status(200).send({ message: "Success", data: result });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};

exports.getAllRelationshipByLevel = async (req, res) => {
  try {
    const id = req.params.userId;
    const level = req.params.level;
    const type = req.params.relationType;

    const result = await relationship.findAll({
      where: { UserId: id, Level: level, Type: type },
      include: [
        {
          model: user,
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    if (result) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      return res.status(200).send({ message: "Success", data: result });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};

//Get one Relationship
exports.getRelationship = async (req, res) => {
  try {
    const id = req.params.UserId;

    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });
    const result = await relationship.findOne({
      where: { SourceId: id },
      include: [
        {
          model: user,
        },
      ],

      order: [["createdAt", "DESC"]],
    });

    if (result) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      return res.status(200).send({ message: "Success", data: result });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};
exports.deleteRelation = async (req, res) => {
  try {
    const id = req.params.userRelationId;

    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });
    const isDeleted = await relationship.destroy({
      where: { UserRelationId: id },
    });

    if (isDeleted) {
      res.status(200).send({ message: "Record has been deleted.!" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};
