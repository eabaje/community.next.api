require("dotenv").config();
const path = require("path");
var fs = require("fs");
require("../config/nodemailer.config");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models/index.model");
const moment = require("moment/moment");

const User = db.user;
const userfollower = db.userfollower;
const Friend = db.Friend;
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

//User Friend

exports.addFriend = async (req, res) => {
  try {
    const { UserId } = req.body;

    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });

    const newFriend = await relationship.create({
      // req.body.,
      FollowerId: UserId,
      FollowedId: req.body.FriendId,
      Type: req.body.Type,

      createdBy: UserId,
      createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),

      UserId: UserId,
    });

    if (newFriend) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      res.status(200).send({ message: "New Friend has been created.!" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};

exports.updateFriend = async (req, res) => {
  try {
    const { UserId, FriendId } = req.body;

    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });
    const newFriend = await relationship.update(
      {
        FollowerId: UserId,
        FollowedId: req.body.FriendId,
        Type: req.body.Type,

        updatedBy: UserId,
        updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),

        UserId: UserId,
      },
      {
        where: { FriendId: req.body.FriendId },
      }
    );

    if (newFriend) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      res.status(200).send({ message: "Friend has been updated.!" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};

exports.deleteFriend = async (req, res) => {
  try {
    const id = req.params.Id;

    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });
    const deletedFriend = await relationship.destroy({
      where: { FriendId: id },
    });

    if (deletedFriend) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      res.status(200).send({ message: "Friend has been deleted.!" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};
//get all Friend
exports.getAllFriend = async (req, res) => {
  try {
    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });
    const result = await relationship.findAll({
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
//Get one Friend
exports.getFriend = async (req, res) => {
  try {
    const id = req.params.advertId;

    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });
    const result = await userfriend.findOne({
      where: { FriendId: id },

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
