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
const userfriend = db.userfriend;
const userpost = db.userpost;
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

exports.addGroup = async (req, res) => {
  try {
    const { UserId } = req.body;

    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });

    const newGroup = await group.create({
      // req.body,
      Title: req.body.Title,
      MetaTitle: req.body.MetaTitle,
      Slug: req.body.Slug,
      Summary: req.body.Summary,
      Status: req.body.Status,
      Profile: req.body.Profile,
      Content: req.body.Content,
      SenderId: req.body.UserId,
      createdBy: UserId,
      createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      UserId: UserId,
    });

    if (newGroup) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      res.status(200).send({ message: "New Group added.!" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};

exports.updateGroup = async (req, res) => {
  try {
    const { UserId, GroupId } = req.body;

    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });
    const updateGroup = await group.update(
      {
        Title: req.body.Title,
        MetaTitle: req.body.MetaTitle,
        Slug: req.body.Slug,
        Summary: req.body.Summary,
        Status: req.body.Status,
        Profile: req.body.Profile,
        Content: req.body.Content,
        SenderId: req.body.UserId,
        updatedBy: UserId,
        updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        UserId: UserId,
      },
      {
        where: { GroupId: req.body.GroupId },
      }
    );

    if (updateGroup) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      res.status(200).send({ message: "Group has been updated.!" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};

exports.deleteGroup = async (req, res) => {
  try {
    const id = req.params.GroupId;

    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });
    const deletedGroup = await group.destroy({
      where: { GroupId: id },
    });

    if (deletedGroup) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      res.status(200).send({ message: "Group has been deleted.!" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};
//get all Post
exports.getAllGroup = async (req, res) => {
  try {
    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });
    const allGroup = await group.findAll({
      include: [
        {
          model: groupmember,
        },
      ],

      order: [["createdAt", "DESC"]],
    });

    if (allGroup) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      return res.status(200).send({ message: "Success", data: allGroup });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};
//Get one post
exports.getGroup = async (req, res) => {
  try {
    const id = req.params.GroupId;

    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });
    const foundGroup = await group.findOne({
      where: { GroupId: id },
      include: [
        {
          model: groupmember,
        },
        {
          model: groupmeta,
          //  attributes: ["Name"],
        },
      ],

      order: [["createdAt", "DESC"]],
    });

    if (foundGroup) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      return res.status(200).send({ message: "Success", data: foundGroup });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};

exports.addGroupMember = async (req, res) => {
  try {
    const { UserId, Comment, MemberType, GroupId } = req.body;

    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });

    const foundGroup = await group.findOne({
      where: { GroupId: GroupId },

      order: [["createdAt", "DESC"]],
    });

    const newGroupMember = await groupmember.create({
      // req.body,
      Type: MemberType ? parseInt(MemberType) : 1,
      GroupId: GroupId,
      Status: req.body.Status ? req.body.Status : 0,
      createdBy: UserId,
      createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      UserId: UserId,
    });

    if (newGroupMember) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      res
        .status(200)
        .send({ message: `New Member added to group -${foundGroup.Title}!` });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};

exports.getAllGroupMember = async (req, res) => {
  try {
    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });
    const allGroupMember = await groupmember.findAll({
      include: [
        {
          model: group,
        },
        {
          model: User,
        },
      ],
      groupBy: ["GroupId"],
      order: [["createdAt", "DESC"]],
    });

    if (allGroupMember) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      return res.status(200).send({ message: "Success", data: allGroupMember });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};

exports.getGroupMember = async (req, res) => {
  try {
    const id = req.params.GroupMemberId;
    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });
    const foundGroupMember = await groupmember.findOne({
      where: { GroupMemberId: id },
      include: [
        {
          model: group,
        },
        {
          model: User,
        },
      ],

      order: [["createdAt", "DESC"]],
    });

    if (foundGroupMember) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      return res
        .status(200)
        .send({ message: "Success", data: foundGroupMember });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};

exports.deleteGroupMember = async (req, res) => {
  try {
    const id = req.params.GroupMemberId;

    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });
    const deletedGroupMember = await groupmember.destroy({
      where: { GroupMemberId: id },
    });

    if (deletedGroupMember) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      res.status(200).send({ message: "Group Member has been deleted.!" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};

exports.addGroupPost = async (req, res) => {
  try {
    const { UserId, PostId } = req.body;

    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });

    const foundPostLike = await grouppost.findOne({
      where: { PostId: PostId, UserId: UserId },
      order: [["createdAt", "DESC"]],
    });
    if (foundPostLike) {
      const updatePostLike = await userpostlike.update(
        {
          UserPostId: req.body.UserPostId,
          Likes: parseInt(foundPostLike.Likes) - 1,
          SenderId: req.body.UserId,
          updatedBy: UserId,
          updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),

          UserId: UserId,
        },
        {
          where: { UserPostLikeId: foundPostLike.UserPostLikeId },
        }
      );

      if (updatePostLike) {
        // return res.status(200).json({
        //   message: "Registration Link Sent",
        // });
        return res.status(200).send({
          message: "Post Comment has been updated.!",
          data: updatePostLike,
        });
      }
    }
    const newPostLike = await userpostlike.create({
      // req.body,
      UserPostId: PostId,
      Likes: 1,
      SenderId: req.body.UserId,
      createdBy: UserId,
      createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),

      UserId: UserId,
    });

    if (newPostLike) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      res.status(200).send({ message: "Post Comment has been created.!" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};

exports.updatePostLike = async (req, res) => {
  try {
    const { UserId, PostId } = req.body;

    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });
    const updatePostLike = await userpostlike.update(
      {
        UserPostId: req.body.UserPostId,
        SenderId: req.body.UserId,
        updatedBy: UserId,
        updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),

        UserId: UserId,
      },
      {
        where: { UserPostLikeId: req.body.UserPostLikeId },
      }
    );

    if (updatePostLike) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      res.status(200).send({
        message: "Post Comment has been updated.!",
        data: updatePostLike,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};

exports.getAllPostLike = async (req, res) => {
  try {
    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });
    const allPostLike = await userpostLike.findAll({
      // include: [
      //   {
      //     model: userpostlike,
      //   },
      //   {
      //     model: userpostcomment,
      //   //  attributes: ["Name"],
      //   },
      // ],

      order: [["createdAt", "DESC"]],
    });

    if (allPostLike) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      return res.status(200).send({ message: "Success", data: allPostLike });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};

exports.getPostLike = async (req, res) => {
  try {
    const id = req.params.UserPostLikeId;
    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });
    const onePostLike = await userpostlike.findOne({
      where: { UserPostLikeId: id },
      // include: [
      //   {
      //     model: userpostlike,
      //   },
      //   {
      //     model: userpostcomment,
      //   //  attributes: ["Name"],
      //   },
      // ],

      order: [["createdAt", "DESC"]],
    });

    if (onePostLike) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      return res.status(200).send({ message: "Success", data: onePostLike });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};

exports.deletePostLike = async (req, res) => {
  try {
    const id = req.params.UserPostCommentId;

    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });
    const deletedPostComment = await userpostcomment.destroy({
      where: { UserPostCommentId: id },
    });

    if (deletedPostComment) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      res.status(200).send({ message: "Post Comment has been deleted.!" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  // const name = req.params.name;
  //var condition = name ? { FullName: { [Op.iLike]: `%${name}%` } } : null;{ where: condition }

  User.findAll({
    include: [
      {
        model: Company,
      },
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

// find all  Post by date
exports.findAllPostByDate = async (req, res) => {
  const startDate = req.params.startDate;
  const endDate = req.params.endDate;
  try {
    const foundPost = await userpost.findAll({
      where: {
        createdAt: {
          [Op.between]: [new Date(Date(startDate)), new Date(Date(endDate))],
        },
      },
      include: [
        {
          model: userpostcomment,
        },
        {
          model: userpostlike,
        },
      ],

      order: [["createdAt", "DESC"]],
    });
    if (foundPost) {
      return res.status(200).send({
        message: "Success",
        data: foundPost,
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: err.message || "Some error occurred while retrieving Users.",
    });
  }
};
