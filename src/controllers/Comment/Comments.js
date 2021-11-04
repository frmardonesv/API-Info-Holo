const Comments = require("../../models/Comments");
const Vtubers = require("../../models/Vtubers");
const covertToken = require("../../utils/covertToken");
const ErrorResponse = require("../../utils/errorResponse");

exports.postComment = async (req, res, next) => {
  const idVtuber = req.params.id;
  const authorization = req.get("Authorization");
  let decodedToken = {};

  decodedToken = covertToken(decodedToken, authorization);

  if (decodedToken.succes) {
    return next(new ErrorResponse("Problema con el servidor.", 400));
  }

  const { id: userId } = decodedToken;

  const newComment = new Comments({
    userId,
    desc: req.body.desc,
    vtuber: idVtuber,
  });

  console.log(newComment);
  try {
    await newComment.save();

    const vtuberRelated = await Vtubers.findById(idVtuber);

    vtuberRelated.comments.push(newComment);

    await vtuberRelated.save();

    res.status(200).json(vtuberRelated);
  } catch (error) {
    console.log(error);
  }
};

exports.getCommentsPost = async (req, res) => {
  const id = req.params.id;
  try {
    const comments = await Vtubers.findById(id, { comments: 1 }).populate({
      path: "comments",
      populate: { path: "userId", select: "username -_id" },
    });
    res.status(200).json(comments);
  } catch (error) {
    console.log(error);
  }
};
