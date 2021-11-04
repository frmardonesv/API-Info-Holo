const express = require("express");
const router = express.Router();

const {
  getAllVtubers,
  getVtuber,
  likeVtuber,
  updateVideos,
  getByGen,
} = require("../controllers/Data/Vtubers");

router.route("/").get(getAllVtubers);
router.route("/:id").get(getVtuber);
router.route("/:id/like").put(likeVtuber);
router.route("/:id/videos").put(updateVideos);
router.route("/generacion/:gen").get(getByGen);

module.exports = router;
