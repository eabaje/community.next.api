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
const advert = db.advert;
const userfriend = db.userfriend;
const userAdvert = db.userAdvert;
const userAdvertlike = db.userAdvertlike;
const userAdvertcomment = db.userAdvertcomment;
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
const groupAdvert = db.groupAdvert;

const place = db.place;
const school = db.school;
const review = db.review;

// const Company = db.company;
// const CompanyDoc = db.companydoc;

const Role = db.role;
const UserRole = db.userrole;
const Op = db.Sequelize.Op;

//User Advert

exports.addAdvert = async (req, res) => {
  try {
    const { UserId } = req.body;

    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });

    const newAdvert = await advert.create({
      // req.body.,
      AdvertName: req.body.AdvertName,
      AdvertType: req.body.AdvertType,
      AdvertCaption: req.body.AdvertCaption,
      AdvertPage: req.body.AdvertPage,
      AdvertSection: req.body.AdvertSection,
      AdvertRegion: req.body.AdvertRegion,
      AdvertCountry: req.body.Country,
      IPAddress: req.body.IPAddress,
      AdvertCost: req.body.AdvertCost,
      Currency: req.body.Currency,
      IsEnabled: req.body.IsEnabled,
      PublishedDateFrom: req.body.PublishedDateFrom,
      PublishedDateFromTo: req.body.PublishedDateFromTo,

      createdBy: UserId,
      createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),

      UserId: UserId,
    });

    if (newAdvert) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      res.status(200).send({ message: "New Advert has been created.!" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};

exports.updateAdvert = async (req, res) => {
  try {
    const { UserId, AdvertId } = req.body;

    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });
    const newAdvert = await advert.update(
      {
        AdvertName: req.body.AdvertName,
        AdvertType: req.body.AdvertType,
        AdvertCaption: req.body.AdvertCaption,
        AdvertPage: req.body.AdvertPage,
        AdvertSection: req.body.AdvertSection,
        AdvertRegion: req.body.AdvertRegion,
        AdvertCountry: req.body.Country,
        IPAddress: req.body.IPAddress,
        AdvertCost: req.body.AdvertCost,
        Currency: req.body.Currency,
        IsEnabled: req.body.IsEnabled,
        PublishedDateFrom: req.body.PublishedDateFrom,
        PublishedDateFromTo: req.body.PublishedDateFromTo,
        updatedBy: UserId,
        updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),

        UserId: UserId,
      },
      {
        where: { AdvertId: req.body.AdvertId },
      }
    );

    if (newAdvert) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      res.status(200).send({ message: "Advert has been updated.!" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};

exports.deleteAdvert = async (req, res) => {
  try {
    const id = req.params.advertId;

    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });
    const deletedAdvert = await advert.destroy({
      where: { AdvertId: id },
    });

    if (deletedAdvert) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      res.status(200).send({ message: "Advert has been deleted.!" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};
//get all Advert
exports.getAllAdvert = async (req, res) => {
  try {
    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });
    const allAdvert = await advert.findAll({
      order: [["createdAt", "DESC"]],
    });

    if (allAdvert) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      return res.status(200).send({ message: "Success", data: allAdvert });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};
//Get one Advert
exports.getAdvert = async (req, res) => {
  try {
    const id = req.params.advertId;

    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });
    const oneAdvert = await userAdvert.findOne({
      where: { AdvertId: id },

      order: [["createdAt", "DESC"]],
    });

    if (oneAdvert) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      return res.status(200).send({ message: "Success", data: oneAdvert });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};
