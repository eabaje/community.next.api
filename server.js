require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const socketio = require("socket.io");

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");
var uuid = require("uuid");
const bcrypt = require("bcryptjs");

//cors
const cors = require("cors");
app.use(cors());

//const server = http.createServer(app);

// For accepting post form data
const bodyParser = require("express").json;
app.use(bodyParser());
// parse requests of content-type - application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./models/index.model");
const { subscribe } = require("./models/index.model");
const Role = db.role;
const User = db.user;
const UserRole = db.userrole;

//db.sequelize.sync();
//force: true will drop the table if it already exists
// db.sequelize
//   .sync({ force: true })
//   .then(() => {
//     console.log("Drop and Resync Database with { force: true }");
//     initial();
//   })
//   .catch((err) => {
//     console.log("Failed to sync db: " + err.message);
//   });

// db.sequelize
//   .sync({ alter: true })
//   .then(() => {
//     console.log("Drop and Resync Database with { alter: true }");
//     // initial();
//   })
//   .catch((err) => {
//     console.log("Failed to sync db: " + err.message);
//   });

// app.use(
//   session({
//     secret: 's3cr3t',
//     resave: true,
//     saveUninitialized: true,
//   }),
// );
// app.use(passport.initialize());
// app.use(passport.session());
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to MyArea api." });
});
app.get("/api", (req, res) => {
  res.json({ message: "Welcome to MyArea api." });
});
app.use(express.static("uploads"));
app.use("/uploads", express.static("uploads"));
app.use("/pics", express.static("pics"));
app.use("/docs", express.static("docs"));

// routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/group.routes")(app);
require("./routes/event.routes")(app);
require("./routes/message.routes")(app);
require("./routes/relationship.routes")(app);
require("./routes/advert.routes")(app);
require("./routes/order.routes")(app);
require("./routes/payment.routes")(app);
require("./routes/post.routes")(app);
require("./routes/upload.routes")(app);

app.use("/api/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// set port, listen for requests
//const PORT = process.env.PORT || 8080;

// const PORT = process.env.PORT || 9000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const users = [];
const server = http.createServer(app);

//const server = app.listen(process.env.PORT, () => console.log(`Server started on ${process.env.PORT}`));

//const io = new Server(httpServer, { cors: { origin: "*" } });

const io = socketio(server, { cors: { origin: "*" } });

//const io = new Server(httpServer, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  socket.on("onLogin", (user) => {
    const updatedUser = {
      ...user,
      online: true,
      socketId: socket.id,
      messages: [],
    };

    const existUser = users.find((x) => x.name === updatedUser.name);
    if (existUser) {
      existUser.socketId = socket.id;
      existUser.online = true;
    } else {
      users.push(updatedUser);
    }
    // const admin = users.find((x) => x.name === 'Admin' && x.online);
    // if (admin) {
    //   io.to(admin.socketId).emit('updateUser', updatedUser);
    // }
    // if (updatedUser.name === 'Admin') {
    //   io.to(updatedUser.socketId).emit('listUsers', users);
    // }
  });

  socket.on("disconnect", () => {
    const user = users.find((x) => x.socketId === socket.id);
    if (user) {
      user.online = false;
      const onlineUser = users.find((x) => x.online);
      if (onlineUser) {
        io.to(onlineUser.socketId).emit("updateUser", user);
      }
    }
  });
  socket.on("onUserSelected", (user) => {
    const userOnline = users.find((x) => x.online);
    if (userOnline) {
      const existUser = users.find((x) => x.name === user.name);
      io.to(admin.socketId).emit("selectUser", existUser);
    }
  });
  socket.on("onMessage", (message) => {
    const user = users.find((x) => x.name === message.to && x.online);
    if (user) {
      io.to(user.socketId).emit("message", message);
      user.messages.push(message);
    } else {
      io.to(socket.id).emit("message", {
        from: "System",
        to: "Admin",
        body: "User Is Not Online",
      });
    }
  });
});
const PORT = process.env.PORT || 8800;

server.listen(process.env.PORT, () => console.log(`Server started on ${PORT}`));
function initial() {
  const { v1: uuidv1, v4: uuidv4 } = require("uuid");
  encryptedPassword = bcrypt.hashSync("Web@2022", 8);
  initialUserId = uuidv4();
  shipperRoleId = uuidv4();
  carrierRoleId = uuidv4();
  adminRoleId = uuidv4();
  auditorRoleId = uuidv4();
  driverRoleId = uuidv4();
  brokerRoleId = uuidv4();
  usersubscribeId = uuidv4();

  let startDate = new Date();

  let endDate = new Date();
  endDate.setDate(endDate.getDate() + 30);

  // Company.create({
  //   //  CompanyId: 1,
  //   CompanyName: "Global Load Dispatch",
  //   ContactEmail: "admin@loaddispatch.com.ng",
  //   ContactPhone: "08057886381",
  //   CompanyType: "admin",
  //   Address: "Lagos",
  //   City: "LG",
  //   Country: "NG",
  // });

  Role.create({
    RoleId: shipperRoleId,
    Name: "user",
  });

  Role.create({
    RoleId: adminRoleId,
    Name: "admin",
  });

  Role.create({
    RoleId: auditorRoleId,
    Name: "auditor",
  });

  User.create({
    UserId: initialUserId,
    FirstName: "Prince",
    LastName: "Nweke",
    Email: "admin@myarea.com.ng",
    Mobile: "08057886381",
    UserName: "admin@myarea.com.ng",
    PasswordHash: encryptedPassword,
    Address: "Lagos",
    City: "LG",
    Country: "NG",
  });

  UserRole.create({
    UserId: initialUserId,
    RoleId: adminRoleId,
  });

  // Subscription.create({
  //   // SubscribeId: 1,
  //   SubscriptionType: "free Trial",
  //   SubscriptionName: "Free 30 Day Trial",
  //   Amount: 0.0,
  //   Description: "Basic ",
  //   Active: true,
  //   Duration: 30,
  // });

  // UserSubscription.create({
  //   // UserSubscriptionId: 1,
  //   SubscribeId: 1,
  //   SubscriptionName: "Free 30 Day Trial",
  //   UserId: initialUserId,
  //   Active: true,
  //   StartDate: startDate,
  //   EndDate: endDate,
  // });
}
