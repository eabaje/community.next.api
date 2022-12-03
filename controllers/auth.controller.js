var generator = require("generate-password");
require("dotenv").config();
const { mailExports } = require("../middleware");

const nodemailer = require("nodemailer");
const mg = require("nodemailer-mailgun-transport");
const handlebars = require("handlebars");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const { mailFunc } = require("../middleware");
const db = require("../models/index.model");
const { exit } = require("process");

const userrelationship = db.userrelationship;
const User = db.user;
const Role = db.role;
const UserRole = db.userrole;
const Company = db.company;
const Subscribe = db.subscribe;
const userfollower = db.userfollower;
const userfriend = db.userfriend;
const groupfollower = db.groupfollower;
const userpost = db.userpost;
const groupmember = db.groupmember;
const UserSubscription = db.usersubscription;
const Op = db.Sequelize.Op;

//const authware = require('../middleware/auth');

const auth = express();

auth.use(express.json({ limit: "50mb" }));

// auth.get("/welcome", authware, (req, res) => {
//   res.status(200).send("Welcome 🙌 ");
// });

// // This should be the last route else any after it won't work
// auth.use("*", (req, res) => {
//   res.status(404).json({
//     success: "false",
//     message: "Page not found",
//     error: {
//       statusCode: 404,
//       message: "You reached a route that is not defined on this server",
//     },
//   });
// });

// module.exports = auth;

exports.signup = async (req, res) => {
  try {
    const isUser = await User.findOne({ where: { Email: req.body.Email } });
    if (isUser) {
      return res.status(404).send({ message: "Email already exists" });
    }

    const encryptedPassword = req.body.Password
      ? bcrypt.hashSync(req.body.Password, 10)
      : bcrypt.hashSync(generator.generate({ length: 8, numbers: true }), 10);

    //console.log('Password:', encryptedPassword);
    const email = req.body.ContactEmail
      ? req.body.ContactEmail
      : req.body.Email;
    const fullname = req.body.FullName
      ? req.body.FullName
      : req.body.FirstName + " " + req.body.LastName;

    const roleType = req.body.RoleType ? req.body.RoleType : "user";

    const user = await User.create({
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Email: req.body.Email.toLowerCase(),
      // Mobile: req.body.Mobile,
      // Address: req.body.Address,
      // City: req.body.Region,
      // Country: req.body.Country,
      UserName: req.body.Email.toLowerCase(),
      // AcceptTerms: req.body.AcceptTerms,
      // PaymentMethod: req.body.PaymentMethod,
      // Currency: req.body.Currency,
      // IsActivated: false,
      // IsConfirmed: false,
      PasswordHash: encryptedPassword,
    });

    // if (!req.body.RoleType) {
    //   return res
    //     .status(404)
    //     .send({ message: "An error occurred with Role Type Provision" });
    // }
    const role = await Role.findOne({ where: { Name: roleType } });

    if (!role) {
      return res
        .status(404)
        .send({ message: "An error occurred with role creation for user" });
    }

    const userrole = await UserRole.create({
      UserId: user.UserId,
      RoleId: role.RoleId,
    });

    if (!userrole) {
      return res
        .status(404)
        .send({ message: "An error occurred with user role" });
    }

    const token = jwt.sign(
      { UserId: user.UserId },
      `${process.env.TOKEN_KEY}`,
      {
        expiresIn: "2h",
      }
    );

    user.Token = token;
    await user.save();

    const url = `${process.env.BASE_URL}` + `auth/verify/${token}`;
    await mailFunc.sendEmail({
      template: "email2",
      subject: "Welcome to MyArea Community",
      toEmail: email,
      msg: {
        name: fullname,
        url: url,
      },
    });

    return res.status(200).send({ message: "User registered successfully!" });
  } catch (error) {
    console.log(`error`, error);
    res.status(500).send({ message: error.message });
  }
};

exports.sendRegistrationLink = (req, res) => {
  const { Email, Name } = req.body;

  const url = `${process.env.BASE_URL}` + `auth/verify/${token}`;
  mailFunc.sendEmailMailGun({
    template: "email2",
    subject: "Welcome to Global Load Dispatch",
    toEmail: Email,
    msg: {
      name: Name,
      url: url,
    },
  });

  if (token) {
    jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err, decoded) => {
      if (err) {
        console.log("Activation error");
        return res.status(401).json({
          errors: "Expired link. Signup again",
        });
      } else {
        const { name, email, password } = jwt.decode(token);

        console.log(email);
        const user = new User({
          name,
          email,
          password,
        });

        user.save((err, user) => {
          if (err) {
            console.log("Save error", errorHandler(err));
            return res.status(401).json({
              errors: errorHandler(err),
            });
          } else {
            return res.json({
              success: true,
              data: user,
              message: "Signup success",
            });
          }
        });
      }
    });
  } else {
    return res.json({
      message: "error happening please try again",
    });
  }
};

exports.signin = async (req, res) => {
  // where: { [Op.and]: [{ Email: req.body.Email }, { IsActivated: true }] },

  try {
    const foundUser = await User.findOne({ where: { Email: req.body.Email } });
    if (!foundUser) {
      return res.status(404).send({ message: "User Not found" });
    } else {
      var passwordIsValid = bcrypt.compareSync(
        req.body.Password,
        foundUser.PasswordHash
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          //  Token: null,
          message: "Invalid Password!",
        });
      }

      const token = jwt.sign(
        { UserId: foundUser.UserId },
        `${process.env.ACCESS_TOKEN_SECRET}`,
        {
          expiresIn: "86400s",
        }
      );
      const refreshToken = jwt.sign(
        { UserId: foundUser.UserId },
        `${process.env.REFRESH_TOKEN_SECRET}`,
        {
          expiresIn: "2d",
        }
      );
      foundUser.Token = refreshToken;
      foundUser.save();

      var authorities = [];
      const userRole = await UserRole.findOne({
        where: { UserId: foundUser.UserId },
      });

      if (!userRole) {
        return res.status(404).send({ message: "User does not have a Role." });
      }

      const role = await Role.findOne({ where: { RoleId: userRole.RoleId } });

      const friendNum = await userrelationship.findAll({
        where: { TargetId: foundUser.UserId, Type: "friend" },
      });
      const followedNum = await userrelationship.findAll({
        where: { TargetId: foundUser.UserId, Type: "follower" },
      });
      const followingNum = await userrelationship.findAll({
        where: { SourceId: foundUser.UserId, Type: "follower" },
      });
      const postlikesNum = await userpost.findAll({
        where: { SenderId: foundUser.UserId },
        attributes: [
          "UserPostId",
          [db.Sequelize.fn("sum", db.Sequelize.col("Likes")), "TotalLikes"],
        ],
        group: ["user_post.UserPostId"],
        raw: true,
        order: db.Sequelize.literal("TotalLikes DESC"),
      });

      if (role) {
        return res.status(200).send({
          message: "Success",
          token: token,

          user: {
            UserId: foundUser.UserId,
            FullName: foundUser.FirstName + " " + foundUser.LastName,
            Email: foundUser.Email,
            Likes: postlikesNum,
            Friends: friendNum.length,
            Following: followingNum.length,
            Followed: followedNum.length,
            roles: role.Name,
            CoverPicture: foundUser.CoverPicture,
            ProfilePicture: foundUser.ProfilePicture,
          },
        });
      }

      // let endDate = new Date();
      // const userSub = await UserSubscription.findOne({
      //   where: {
      //     UserId: foundUser.UserId,
      //     Active: true,
      //     EndDate: {
      //       [Op.lt]: new Date(),
      //     },
      //   },
      // });

      // console.log("UserSub", userSub);
      // const subExpired = userSub !== null ? true : false;

      // const company = await Company.findOne({
      //   where: { CompanyId: foundUser.CompanyId },
      // });

      // if (company) {
      //   res.status(200).send({
      //     message: "Success",
      //     token: token,

      //     user: {
      //       UserId: foundUser.UserId,
      //       FullName: foundUser.FullName,
      //       Email: foundUser.Email,
      //       CompanyId: foundUser.CompanyId,
      //       CompanyName: company.CompanyName,
      //       roles: role.Name,
      //       isActivated: foundUser.IsActivated,
      //       subExpired: subExpired,
      //       UserPicUrl: foundUser.UserPicUrl,
      //     },
      //   });
      // }
    }
  } catch (error) {
    console.log("error:", error.message);
    res.status(500).send({ message: error.message });
  }
};

exports.reset = (req, res) => {
  // where: { [Op.and]: [{ Email: req.body.Email }, { IsActivated: true }] },
  console.log("req.body.Email", req.body.Email);
  User.findOne({
    where: { Email: req.body.Email },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      const id = user.UserId;
      const encryptedPassword = req.body.Password
        ? bcrypt.hashSync(req.body.Password, 10)
        : bcrypt.hashSync(generator.generate({ length: 8, numbers: true }), 10);

      User.update(
        { Password: encryptedPassword },
        {
          where: { UserId: user.UserId },
        }
      )
        .then((num) => {
          if (num == 1) {
            const transporter = nodemailer.createTransport({
              host: `${process.env.SMTP_HOST}`,
              port: `${process.env.SMTP_PORT}`,
              auth: {
                user: `${process.env.SMTP_USER}`,
                pass: `${process.env.SMTP_PASSWORD}`,
              },
            });
            // //  mailgun
            // // Step 2 - Generate a verification token with the user's ID
            // const verificationToken = user.generateVerificationToken();
            // // Step 3 - Email the user a unique verification link

            // point to the template folder
            const handlebarOptions = {
              viewEngine: {
                partialsDir: path.resolve("./views/"),
                defaultLayout: false,
              },
              viewPath: path.resolve("./views/"),
            };

            // use a template file with nodemailer
            transporter.use("compile", hbs(handlebarOptions));

            const url = `${process.env.BASE_URL}` + `auth/verify/${token}`;
            transporter.sendMail({
              from: `${process.env.STMP_FROM_EMAIL}`,
              to: req.body.Email,
              template: "emailPassword", // the name of the template file i.e email.handlebars
              context: {
                name: user.FullName,
                password: encryptedPassword,
              },
              subject: "Password Reset",
              //     html: `<h1>Email Confirmation</h1>
              // <h2>Hello ${fullname}</h2>

              // <p>Password: `${encryptedPassword}`By signing up for a free 90 day trial with Load Dispatch Service, you can connect with carriers,shippers and drivers.<br/></p>
              // To finish up the process kindly click on the link to confirm your email <a href = '${url}'>Click here</a>
              // </div>`,
            });

            res.send({
              message: "Your password has been reset.Kindly check your email.",
            });
          } else {
            res.send({
              message: `operation failed! contact your administrator`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: `operation failed! contact your administrator`,
          });
        });
    })
    .catch((err) => {
      console.log("state:", err.message);
      res.status(500).send({ message: err.message });
    });
};

exports.verify = (req, res) => {
  const token = req.params.token;
  // Check we have an id
  if (!token) {
    return res.status(422).send({
      message: "Missing Token",
    });
  }
  // Step 1 -  Verify the token from the URL
  let payload = null;
  try {
    payload = jwt.verify(token, process.env.TOKEN_KEY);
  } catch (err) {
    return res.status(500).send(err);
  }
  console.log(`payload`, payload.UserId);
  User.findOne({
    where: { UserId: payload.UserId },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      user.IsActivated = true;
      user.save();
      console.log(`payload`, payload.UserId);
      console.log("User:", user.UserId);
      User.findOne({ where: { UserId: user.UserId, IsActivated: true } }).then(
        (isActivated) => {
          if (!isActivated) {
            return res.status(404).send({
              message: "Kindly click to confirm again",
            });
          }
        }
      );

      return res.redirect(process.env.ADMIN_URL);
    })
    .catch((err) => {
      console.log("Error:", err.message);
      return res.status(500).send({ message: err.message });
    });
};

exports.userActivation = (req, res) => {
  // const token = req.params.token;
  // // Check we have an id
  // if (!token) {
  //   return res.status(422).send({
  //     message: 'Missing Token',
  //   });
  // }
  // Step 1 -  Verify the token from the URL
  // let payload = null;
  // try {
  //   payload = jwt.verify(token, process.env.TOKEN_KEY);
  // } catch (err) {
  //   return res.status(500).send(err);
  // }
  // console.log(`payload`, payload.UserId);
  const UserId = req.params.userId;
  User.findOne({
    where: { UserId: UserId },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      user.IsActivated = true;
      user.save();
      // console.log(`payload`, payload.UserId);
      // console.log('User:', user.UserId);
      User.findOne({ where: { UserId: user.UserId, IsActivated: true } }).then(
        (isActivated) => {
          if (!isActivated) {
            return res.status(404).send({
              message: "Kindly click to confirm again",
            });
          }

          const transporter = nodemailer.createTransport({
            host: `${process.env.SMTP_HOST}`,
            port: `${process.env.SMTP_PORT}`,
            auth: {
              user: `${process.env.SMTP_USER}`,
              pass: `${process.env.SMTP_PASSWORD}`,
            },
          });
          // //  mailgun
          // // Step 2 - Generate a verification token with the user's ID
          // const verificationToken = user.generateVerificationToken();
          // // Step 3 - Email the user a unique verification link

          // point to the template folder
          const handlebarOptions = {
            viewEngine: {
              partialsDir: path.resolve("./views/"),
              defaultLayout: false,
            },
            viewPath: path.resolve("./views/"),
          };

          // use a template file with nodemailer
          transporter.use("compile", hbs(handlebarOptions));

          const url = `${process.env.ADMIN_URL}` + `auth/verify/${token}`;
          const m = `<h1>Email Confirmation</h1>
  <h2>Hello ${user.FullName}</h2>
   <p>congratulations for the completion of your registration.After a careful review, we are happy to inform you that are fully vetted to use the
   Load Dispatch Service, you can connect with carriers,shippers and drivers.<br/></p>
   
   <p> yours sincerely</p>
   
   <p> Global LoadBoard Services </p>
  
   `;
          transporter.sendMail({
            from: `${process.env.STMP_FROM_EMAIL}`,
            to: req.body.Email,
            template: "generic", // the name of the template file i.e email.handlebars
            context: {
              name: user.FullName,
              msg: encryptedPassword,
            },
            subject: "Information Successfully Vetted",
          });
        }
      );
      // send mail to user

      return res.redirect(process.env.ADMIN_URL);
    })
    .catch((err) => {
      console.log("Error:", err.message);
      return res.status(500).send({ message: err.message });
    });
};

exports.activation = (req, res) => {
  const { token } = req.body;

  if (token) {
    jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err, decoded) => {
      if (err) {
        console.log("Activation error");
        return res.status(401).json({
          errors: "Expired link. Signup again",
        });
      } else {
        const { name, email, password } = jwt.decode(token);

        console.log(email);
        const user = new User({
          name,
          email,
          password,
        });

        user.save((err, user) => {
          if (err) {
            console.log("Save error", errorHandler(err));
            return res.status(401).json({
              errors: errorHandler(err),
            });
          } else {
            return res.json({
              success: true,
              data: user,
              message: "Signup success",
            });
          }
        });
      }
    });
  } else {
    return res.json({
      message: "error happening please try again",
    });
  }
};

exports.logout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;

  // Is refreshToken in db?
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }

  // Delete refreshToken in db
  foundUser.refreshToken = "";
  const result = await foundUser.save();
  console.log(result);

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.sendStatus(204);
};

exports.redirect = (req, res) => {
  // Successful authentication, redirect home.
  res.redirect("/");
};
