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

//User Post

exports.addPost = async (req, res) => {
  try {
    const { UserId } = req.body;

    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });
    const newPost = await userpost.create({
      // req.body,
      Message: req.body.Message,
      SenderId: req.body.UserId,
      createdBy: UserId,
      createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),

      UserId: UserId,
    });

    if (newPost) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      res.status(200).send({ message: "Post has been created.!" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { UserId, PostId } = req.body;

    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });
    const newPost = await userpost.update(
      {
        Message: req.body.Message,
        SenderId: req.body.UserId,
        updatedBy: UserId,
        updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),

        UserId: UserId,
      },
      {
        where: { UserId: id, PostId: req.body.PostId },
      }
    );

    if (newPost) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      res.status(200).send({ message: "Post has been created.!" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const id = req.params.PostId;

    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });
    const deletedPost = await userpost.destroy({
      where: { PostId: id },
    });

    if (deletedPost) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      res.status(200).send({ message: "Post has been created.!" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};
//get all Post
exports.getAllPost = async (req, res) => {
  try {
    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });
    const allPost = await userpost.findAll({
      include: [
        {
          model: userpostlike,
        },
        {
          model: userpostcomment,
          //  attributes: ["Name"],
        },
      ],

      order: [["createdAt", "DESC"]],
    });

    if (allPost) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      return res.status(200).send({ message: "Success", data: allPost });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};
//Get one post
exports.getPost = async (req, res) => {
  try {
    const id = req.params.PostId;

    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });
    const onePost = await userpost.findOne({
      where: { PostId: id },
      include: [
        {
          model: userpostlike,
        },
        {
          model: userpostcomment,
          //  attributes: ["Name"],
        },
      ],

      order: [["createdAt", "DESC"]],
    });

    if (onePost) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      return res.status(200).send({ message: "Success", data: onePost });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};

//Post Comment
exports.addPostComment = async (req, res) => {
  try {
    const { UserId, PostId, Comment } = req.body;

    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });
    const newPostComment = await userpostcomment.create({
      // req.body,
      PostId: PostId,
      Comment: Comment,
      SenderId: req.body.UserId,
      createdBy: UserId,
      createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),

      UserId: UserId,
    });

    if (newPostComment) {
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

exports.updatePostComment = async (req, res) => {
  try {
    const { UserId, PostId, Comment } = req.body;

    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });
    const updatePost = await userpostcomment.update(
      {
        Comment: req.body.Comment,
        SenderId: req.body.UserId,
        updatedBy: UserId,
        updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),

        UserId: UserId,
      },
      {
        where: { UserPostCommentId: req.body.UserPostCommentId },
      }
    );

    if (updatePost) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      res
        .status(200)
        .send({ message: "Post Comment has been updated.!", data: updatePost });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};

exports.getAllPostComment = async (req, res) => {
  try {
    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });
    const allComment = await userpostcomment.findAll({
      include: [
        {
          model: userpostlike,
        },
        {
          model: userpostcomment,
          //  attributes: ["Name"],
        },
      ],

      order: [["createdAt", "DESC"]],
    });

    if (allComment) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      return res.status(200).send({ message: "Success", data: allComment });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};

exports.getPostComment = async (req, res) => {
  try {
    const id = req.params.PostId;
    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });
    const allComment = await userpostcomment.findOne({
      where: { UserPostCommentId: id },
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

    if (allComment) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      return res.status(200).send({ message: "Success", data: allComment });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};

exports.deletePostComment = async (req, res) => {
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

//Post Likes 

exports.addPostLike = async (req, res) => {
  try {
    const { UserId, PostId } = req.body;

    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });

    const foundPostLike = await userpostlike.findOne({
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
