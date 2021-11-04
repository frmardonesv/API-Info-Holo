const express = require("express");
const router = express.Router();
const {
  postComment,
  getCommentsPost,
} = require("../controllers/Comment/Comments");

router.route("/:id").post(postComment);
router.route("/:id/comments").get(getCommentsPost);

module.exports = router;
