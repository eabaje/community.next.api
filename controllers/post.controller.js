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

exports.getAllPost = async (req, res) => {
  try {
    const id = req.params.PostId;

    // const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    // jwt.verify(token, "secretkey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is not valid!");

    // });
    const allPost = await userpost.findAll({
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
    });

    if (allPost) {
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

exports.findAllBySearch = (req, res) => {
  const name = req.params.name;
  var condition = name ? { FullName: { [Op.iLike]: `%${name}%` } } : null;

  User.findAll({
    where: condition,
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

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.userId;

  User.findOne({
    where: { UserId: id },
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
      console.log("err", err);
      res.status(500).send({
        message: "Error retrieving User with UserId=" + id,
      });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
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
    include: {
      model: Company,
      attributes: ["CompanyName"],
    },

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

      const newCompanyDoc = CompanyDoc.create(companyDoc);
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

exports.findCompany = (req, res) => {
  const id = req.params.companyId;

  Company.findOne({ where: { CompanyId: id } })

    .then((data) => {
      res.status(200).send({
        message: "Success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Company with CompanyId=" + id,
      });
    });
};

exports.findAllCompanys = (req, res) => {
  const CompanyType = req.query.companyType;
  var condition = CompanyType
    ? { CompanyType: { [Op.iLike]: `%${CompanyType}%` } }
    : null;

  Company.findAll({ where: condition })

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

exports.findAllCompanysByDate = (req, res) => {
  const startDate = req.params.startDate;
  const endDate = req.params.endDate;

  Company.findAll({
    where: {
      createdAt: {
        [Op.between]: [new Date(Date(startDate)), new Date(Date(endDate))],
      },
    },
    order: [["createdAt", "ASC"]],
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

exports.deleteCompany = (req, res) => {
  const id = req.params.companyId;

  Company.destroy({
    where: { CompanyId: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Company was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Company with id=${id}. Maybe Company was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Company with id=" + id,
      });
    });
};

exports.subscribe = (req, res) => {
  // Add user to Subscription

  const UserId = req.body.UserId;

  const IsSubscribed = UserSubscription.findAll({
    where: { UserId: UserId, Active: true },
  });

  if (IsSubscribed) {
    return res
      .status(409)
      .send(
        "User Already Subscribed. Do you want to upgrade your subscription?"
      );
  }

  // Get the subscription package

  Subscription.findOne({
    where: { SubscribeId: req.body.SubscriptionId },
  }).then((subscribeRes) => {
    let startDate = new Date();

    let endDate = new Date();
    endDate.setDate(endDate.getDate() + parsInt(subscribeRes.Duration));

    const subscribe = {
      SubscriptionId: req.body.SubscriptionId,
      SubscriptionName: req.body.SubscriptionName,
      UserId: req.body.UserId,
      Active: true,
      StartDate: startDate,
      EndDate: endDate,
    };

    UserSubscription.create(subscribe).then((UserSubscribed) => {
      if (UserSubscribed) {
        return res.status(201).send({
          message: `User Subscribed to  ${subscribeRes.SubscriptionName} package.`,
        });
      }
    });
  });

  const User = User.findOne({ where: { UserId: UserId } });

  const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  transporter.sendMail({
    to: email,
    subject: "Tnanks for your subscription",
    html: `Dear ${User.FullName}<p> You subscribed to package ${SubscriptionName} from ${StartDate} to ${EndDate}</p>kindly Click <a href = '${url}'>here</a> to your dashboard to begin.`,
  });
  return res.status(201).send({
    message: `Sent a verification email to ${email}`,
  });

  // };
};

exports.upgradeUserSubscription = (req, res) => {
  const id = req.body.UserSubscriptionId;

  const UserId = req.body.UserId;

  UserSubscription.findAll({ where: { UserId: UserId, Active: true } })

    .then((IsSubscribed) => {
      if (IsSubscribed) {
        UserSubscription.update(
          { Active: false },
          {
            where: {
              UserId: UserId,
            },
          }
        );
      }

      // Get the subscription package
      // console.log('req.body.SubscriptionId', req.body.SubscriptionId);
      Subscription.findOne({
        where: { SubscribeId: req.body.SubscriptionId },
      }).then((subscribeRes) => {
        console.log("subscribeRes", subscribeRes);
        let startDate = new Date();

        let endDate = new Date();
        endDate.setDate(endDate.getDate() + parseInt(subscribeRes.Duration));

        const subscribe = {
          SubscribeId: req.body.SubscriptionId,
          SubscriptionName: subscribeRes.SubscriptionName,
          UserId: req.body.UserId,
          Active: true,
          StartDate: startDate,
          EndDate: endDate,
        };

        UserSubscription.create(subscribe).then((UserSubscribed) => {
          if (UserSubscribed) {
            return res.status(201).send({
              message: `User Subscribed to  ${subscribeRes.SubscriptionName} package.`,
            });
          }
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.updateUserSubscription = (req, res) => {
  const id = req.body.UserSubscriptionId;

  UserSubscription.update(req.body, {
    where: { UserSubscriptionId: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update User Subscription with id=${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User Subscription with id=" + id,
      });
    });
};

exports.findUserSubscription = (req, res) => {
  const id = req.params.userId;

  UserSubscription.findOne({
    where: { UserId: id, Active: true },

    include: {
      model: User,
      attributes: ["FullName", "Email", "PaymentMethod", "Currency"],
    },
  })

    .then((data) => {
      res.status(200).send({
        message: "Success",
        data: data,
      });
    })
    .catch((err) => {
      console.log(`error`, err);
      res.status(500).send({
        message: "Error retrieving User with UserId=" + id,
      });
    });
};

exports.findAllUserSubscriptions = (req, res) => {
  const subscriptionId = req.param.subscriptionId;
  var condition = subscriptionId ? { SubscribeId: subscriptionId } : null;

  UserSubscription.findAll({
    where: condition,
    include: {
      model: User,
      attributes: ["FullName", "Email", "PaymentMethod", "Currency"],
    },
    order: [["createdAt", "DESC"]],
  })

    .then((data) => {
      console.log(`data`, data);
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

exports.findAllUserSubscriptionsByDate = (req, res) => {
  const startDate = req.params.startDate;
  const endDate = req.params.endDate;

  User.UserSubscription({
    where: {
      createdAt: {
        [Op.between]: [new Date(Date(startDate)), new Date(Date(endDate))],
      },
    },
    include: {
      model: User,
      attributes: ["FullName", "Email", "PaymentMethod", "Currency"],
    },

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

exports.findAllUserSubscriptionsByStartDate = (req, res) => {
  const startDate = req.params.startDate;
  const endDate = req.params.endDate;

  User.UserSubscription({
    where: {
      StartDate: {
        [Op.between]: [new Date(Date(startDate)), new Date(Date(endDate))],
      },
    },
    include: {
      model: User,
      attributes: ["FullName", "Email", "PaymentMethod", "Currency"],
    },
    order: [["createdAt", "ASC"]],
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

exports.findAllUserSubscriptionsByEndDate = (req, res) => {
  const startDate = req.params.startDate;
  const endDate = req.params.endDate;

  User.UserSubscription({
    where: {
      EndDate: {
        [Op.between]: [new Date(Date(startDate)), new Date(Date(endDate))],
      },
    },
    include: {
      model: User,
      attributes: ["FullName", "Email", "PaymentMethod", "Currency"],
    },
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

exports.deleteUserSubscription = (req, res) => {
  const id = req.params.UserId;

  UserSubscription.destroy({
    where: { UserSubscriptionId: id },
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