const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    desc: {
      type: String,
      max: 500,
      required: [true, "Por favor ingresa un comentario"],
    },
    vtuber: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vtubers",
      },
    ],
  },
  { timestamps: true }
);

const Comments = mongoose.model("Comments", CommentSchema);

module.exports = Comments;
