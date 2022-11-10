const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger_output.json";
const endpointsFiles = [
  "./routes/auth.routes.js",
  "./routes/group.routes.js",
  "./routes/post.routes.js",
  "./routes/advert.routes.js",
  // "./routes/order.routes.js",
  // "./routes/payment.routes.js",
  // "./routes/upload.routes.js",
  "./routes/user.routes.js",
];

swaggerAutogen(outputFile, endpointsFiles);

swaggerAutogen(outputFile, endpointsFiles).then(() => {
  require("./server.js");
});
