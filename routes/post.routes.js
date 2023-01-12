const { authJwt } = require("../middleware");
const controller = require("../controllers/post.controller");
// var passportFacebook = require('../middleware/facebook');
// var passportGoogle = require('../middleware/google');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  //[verifySignUp.checkDuplicateUsernameOrEmail,verifySignUp.checkRolesExisted],
  //Timeline

  app.post("/api/post/addpost", controller.addPost);

  app.post("/api/post/addpostcomment", controller.addPostComment);

  app.post("/api/post/addpostlike", controller.addPostLike);

  app.post("/api/post/addpost", controller.addPost);

  app.put("/api/post/updatepost", controller.updatePost);

  app.put("/api/post/updatepostlike", controller.updatePostLike);

  app.put("/api/post/updatepostcomment", controller.updatePostComment);

  app.get("/api/post/getallpost/:userId", controller.getAllPost);

  app.get("/api/post/getpost/:postId", controller.getPost);

  app.get("/api/post/getallpostcomment", controller.getAllPostComment);

  app.get("/api/post/getpostcomment/:postId", controller.getPostComment);

  app.get("/api/post/getTimeline/:userId", controller.getTimeline);

  app.delete("/api/post/deletepost/:postId", controller.deletePost);
  app.delete(
    "/api/post/deletepostcomment/:userPostCommentId",
    controller.deletePostComment
  );
  app.delete(
    "/api/post/deletepostlike/:userPostLikeId",
    controller.deletePostLike
  );
};
