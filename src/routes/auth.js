const express = require("express");
const router = express.Router();
const {
  registro,
  login,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth/auth.js");

router.route("/registro").post(registro);

router.route("/login").post(login);

router.route("/forgotPassword").post(forgotPassword);

router.route("/resetPassword/:resettoken").put(resetPassword);

module.exports = router;
