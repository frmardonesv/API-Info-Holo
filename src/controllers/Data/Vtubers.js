const Vtubers = require("../../models/Vtubers");

const getAllVtubers = async (req, res) => {
  try {
    const vtubers = await Vtubers.find(
      {}
      // { _id: 1, nombre: 1, avatar: 1, generacion: 1 }
    );
    res.json(vtubers);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

const getVtuber = async (req, res) => {
  try {
    const vtuber = await Vtubers.findById(req.params.id, { comments: 0 });
    res.json(vtuber);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

const getByGen = async (req, res) => {
  try {
    const genSearch = req.params.gen;
    const membersGen = await Vtubers.find({
      generacion: { $regex: new RegExp("^" + genSearch.toLowerCase(), "i") },
    });
    res.status(200).json(membersGen);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const likeVtuber = async (req, res) => {
  const idVtuber = req.params.id;
  const userName = req.body.user;

  try {
    const vtuber = await Vtubers.findById(idVtuber);
    if (!vtuber.likes.includes(userName)) {
      vtuber.likes.push(userName);
      await vtuber.save();
      const likes = vtuber.likes;

      res.status(200).json({
        likes,
        message: "Fav added!",
      });
    } else {
      vtuber.likes.pull(userName);
      await vtuber.save();
      const likes = vtuber.likes;

      res.status(200).json({
        likes,
        message: "Fav removed",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const updateVideos = async (req, res) => {
  const id = req.params.id;
  const { nombre, thumb, src } = req.body;

  const newVideo = {
    nombre,
    src,
    thumb,
  };
  console.log(newVideo, id);

  try {
    const vtuber = await Vtubers.findById(id);
    vtuber.videos.push(newVideo);
    await vtuber.save();
    res.status(200).json({
      vtuber,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error" + error,
    });
  }
};

module.exports = {
  getAllVtubers,
  getVtuber,
  likeVtuber,
  updateVideos,
  getByGen,
};
