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
const Event = db.Event;
const userfriend = db.userfriend;

const usermessage = db.usermessage;
const userevent = db.userevent;
const usernotification = db.usernotification;

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

//User Event

exports.addEvent = async (req, res) => {
  try {
    const { UserId } = req.body;

    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });

    const newEvent = await userevent.create({
      // req.body.,
      SourceId: UserId,
      TargetId: req.body.TargetId,
      TargetType: req.body.TargetType,
      Comment: req.body.Comment,
      Type: req.body.Type,

      createdBy: UserId,
      createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),

      UserId: UserId,
    });

    if (newEvent) {
      // check if user belongs to group or friendlist
      const result = await group.findAll({
        include: [
          {
            model: groupmember,
            where: { UserId: UserId },
          },
        ],

        order: [["createdAt", "DESC"]],
      });

      result.map((groupItem) => {
        //Send a group message
      });

      const newNote = await usernotification.create({
        // req.body.,
        SourceId: UserId,
        TargetId: req.body.TargetId,
        Comment: req.body.Comment,
        Type: req.body.Type,

        createdBy: UserId,
        createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),

        UserId: UserId,
      });

      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      res.status(200).send({ message: "New Event has been created.!" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { UserId, UserEventId } = req.body;

    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });
    const newEvent = await userevent.update(
      {
        SourceId: UserId,
        TargetId: req.body.TargetId,
        TargetType: req.body.TargetType,
        Comment: req.body.Comment,
        Type: req.body.Type,
        updatedBy: UserId,
        updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),

        UserId: UserId,
      },
      {
        where: { EventId: req.body.EventId },
      }
    );

    if (newEvent) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      res.status(200).send({ message: "Event has been updated.!" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const id = req.params.Id;

    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });
    const deletedEvent = await userevent.destroy({
      where: { UserEventId: id },
    });

    if (deletedEvent) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      res.status(200).send({ message: "Event has been deleted.!" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};
//get all Event
exports.getAllEvent = async (req, res) => {
  try {
    const id = req.params.userId;
    var condition = id ? { UserId: { [Op.iLike]: `%${id}%` } } : null;

    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });
    const result = await usermessage.findAll({
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

exports.getAllEventSent = async (req, res) => {
  try {
    const id = req.params.targetId;
    var condition = id ? { TargetId: { [Op.iLike]: `%${id}%` } } : null;

    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });
    const result = await usermessage.findAll({
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
//Get one Event
exports.getEvent = async (req, res) => {
  try {
    const id = req.params.UserEventId;

    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });
    const result = await userevent.findOne({
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

//Notification

exports.getAllNotificationSent = async (req, res) => {
  try {
    const id = req.params.targetId;
    var condition = id ? { TargetId: { [Op.iLike]: `%${id}%` } } : null;

    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });
    const result = await usernotification.findAll({
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
//Get one Event
exports.getEvent = async (req, res) => {
  try {
    const id = req.params.UserEventId;

    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });
    const result = await userevent.findOne({
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
