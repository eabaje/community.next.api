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


//Group 

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

exports.findAllGroupByDate = async (req, res) => {
  const startDate = req.params.startDate;
  const endDate = req.params.endDate;
  try {
    const found = await group.findAll({
      where: {
        createdAt: {
          [Op.between]: [new Date(Date(startDate)), new Date(Date(endDate))],
        },
      },
      include: [
        {
          model: groupmember,
        },
        {
          model: groupmeta,
          //  attributes: ["Name"],
        },
      ],
      groupBy: ["GroupId"],


      order: [["createdAt", "DESC"]],
    });
    if (found) {
      return res.status(200).send({
        message: "Success",
        data: found,
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: err.message || "Some error occurred while retrieving Users.",
    });
  }
};


//Get Group
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

//Group Member

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
     
      return res.status(200).send({ message: "Success", data: allGroupMember });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};

exports.findAllGroupMemberByDate = async (req, res) => {
  const startDate = req.params.startDate;
  const endDate = req.params.endDate;
  try {
    const found = await groupmember.findAll({
      where: {
        createdAt: {
          [Op.between]: [new Date(Date(startDate)), new Date(Date(endDate))],
        },
      },
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
    if (found) {
      return res.status(200).send({
        message: "Success",
        data: found,
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: err.message || "Some error occurred while retrieving Users.",
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
      
      res.status(200).send({ message: "Group Member has been deleted.!" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};


//Group Post

exports.addGroupPost = async (req, res) => {
  try {
    const { UserId, PostId,GroupId,GroupPostId } = req.body;

    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });

    const foundGroupPost = await grouppost.findOne({
      where: { GroupPostId: GroupPostId, UserId: UserId },
      order: [["createdAt", "DESC"]],
    });
    if (foundGroupPost) {
      const updateGroupPost = await grouppost.update(
        {
         
          Message: req.body.Message,
          SenderId: req.body.UserId,
          updatedBy: UserId,
          updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          UserId: UserId,
        },
        {
          where: { GroupPostId: foundGroupPost.GroupPostId },
        }
      );

      if (updateGroupPost) {
        // return res.status(200).json({
        //   message: "Registration Link Sent",
        // });
        return res.status(200).send({
          message: "Group Post has been updated.!",
          data: updateGroupPost,
        });
      }
    }
    const newGroupPost = await grouppost.create({
      // req.body,
     
      Message: req.body.Message,
      SenderId: req.body.UserId,
      createdBy: UserId,
      createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      UserId: UserId,
    });

    if (newGroupPost) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      res.status(200).send({ message: "Group Post has been created.!" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};



exports.getAllGroupPost = async (req, res) => {
  try {
    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });
    const allGroupPost = await grouppost.findAll({
      include: [
        {
          model: User,
        },
        // {
        //   model: userpostcomment,
        // //  attributes: ["Name"],
        // },
      ],

      order: [["createdAt", "DESC"]],
    });

    if (allGroupPost) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      return res.status(200).send({ message: "Success", data: allGroupPost });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};

exports.getGroupPost = async (req, res) => {
  try {
    const id = req.params.GroupPostId;
    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });
    const oneGroupPost = await grouppost.findOne({
      where: { GroupPostId: id },
      include: [
        {
          model: User,
        },
        // {
        //   model: userpostcomment,
        // //  attributes: ["Name"],
        // },
      ],

      order: [["createdAt", "DESC"]],
    });

    if (oneGroupPost) {
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

exports.deleteGroupPost = async (req, res) => {
  try {
    const id = req.params.GroupPostId;

    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });
    const deletedGroupPost = await grouppost.destroy({
      where: { GroupPostId: id },
    });

    if (deletedGroupPost) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      res.status(200).send({ message: "Group Post has been deleted.!" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};


// find all  Post by date
exports.findAllGroupPostByDate = async (req, res) => {
  const startDate = req.params.startDate;
  const endDate = req.params.endDate;
  try {
    const foundPost = await grouppost.findAll({
      where: {
        createdAt: {
          [Op.between]: [new Date(Date(startDate)), new Date(Date(endDate))],
        },
      },
      include: [
        {
          model: User,
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



//Group Message




exports.addgroupMessage = async (req, res) => {
  try {
    const { UserId, MessageId,GroupId,groupmessageId } = req.body;

    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });

    const foundgroupmessage = await groupmessage.findOne({
      where: { groupmessageId: groupmessageId, UserId: UserId },
      order: [["createdAt", "DESC"]],
    });
    if (foundgroupmessage) {
      const updategroupmessage = await groupmessage.update(
        {
         
          Message: req.body.Message,
          SenderId: req.body.UserId,
          updatedBy: UserId,
          updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          UserId: UserId,
        },
        {
          where: { groupmessageId: foundgroupmessage.groupmessageId },
        }
      );

      if (updategroupmessage) {
        // return res.status(200).json({
        //   message: "Registration Link Sent",
        // });
        return res.status(200).send({
          message: "Group Message has been updated.!",
          data: updategroupmessage,
        });
      }
    }
    const newgroupmessage = await groupmessage.create({
      // req.body,
     
      Message: req.body.Message,
      SenderId: req.body.UserId,
      createdBy: UserId,
      createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      UserId: UserId,
    });

    if (newgroupmessage) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      res.status(200).send({ message: "Group Message has been created.!" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};



exports.getAllGroupMessage = async (req, res) => {
  try {
    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });
    const allgroupmessage = await groupmessage.findAll({
      include: [
        {
          model: User,
        },
        // {
        //   model: userMessagecomment,
        // //  attributes: ["Name"],
        // },
      ],

      order: [["createdAt", "DESC"]],
    });

    if (allgroupmessage) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      return res.status(200).send({ message: "Success", data: allgroupmessage });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};

exports.getGroupMessage = async (req, res) => {
  try {
    const id = req.params.groupmessageId;
    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });
    const onegroupmessage = await groupmessage.findOne({
      where: { groupmessageId: id },
      include: [
        {
          model: User,
        },
        // {
        //   model: userMessagecomment,
        // //  attributes: ["Name"],
        // },
      ],

      order: [["createdAt", "DESC"]],
    });

    if (onegroupmessage) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      return res.status(200).send({ message: "Success", data: oneMessageLike });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};

exports.deleteGroupMessage = async (req, res) => {
  try {
    const id = req.params.groupmessageId;

    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });
    const isDeleted = await groupmessage.destroy({
      where: { groupmessageId: id },
    });

    if (isDeleted) {
      // return res.status(200).json({
      //   message: "Registration Link Sent",
      // });
      res.status(200).send({ message: "Group Message has been deleted.!" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred .",
    });
  }
};


// find all  Message by date
exports.findAllGroupMessageByDate = async (req, res) => {
  const startDate = req.params.startDate;
  const endDate = req.params.endDate;
  try {
    const foundMessage = await groupmessage.findAll({
      where: {
        createdAt: {
          [Op.between]: [new Date(Date(startDate)), new Date(Date(endDate))],
        },
      },
      include: [
        {
          model: User,
        },
       
      ],

      order: [["createdAt", "DESC"]],
    });
    if (foundMessage) {
      return res.status(200).send({
        message: "Success",
        data: foundMessage,
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: err.message || "Some error occurred while retrieving Users.",
    });
  }
};