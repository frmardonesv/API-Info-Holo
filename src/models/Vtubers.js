const mongoose = require("mongoose");

const VtubersSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "Por favor ingresa un nombre"],
  },
  originalName: {
    type: String,
  },
  generacion: {
    type: String,
    required: [true, "Por favor ingresa una generación"],
  },
  edad: {
    type: Number,
    required: [true, "Por favor ingresa una edad"],
  },
  descripcion: {
    type: String,
    required: [true, "Por favor ingresa una descripcion"],
  },
  altura: {
    type: Number,
    required: [true, "Por favor ingresa una altura"],
  },
  avatar: {
    type: String,
    required: [true, "Por favor ingresa una url"],
  },
  bgAvatar: {
    type: String,
  },
  cumpleaños: {
    type: String,
    required: [true, "Por favor ingresa una fecha de cumpleaños"],
  },
  debut: {
    type: String,
    required: [true, "Por favor ingresa una fecha"],
  },
  youtubeChannel: {
    type: String,
    required: [true, "Por favor ingresa una url"],
  },
  twitter: {
    type: String,
    required: [true, "Por favor ingresa una url"],
  },
  videos: {
    type: Array,
  },
  likes: {
    type: Array,
    default: [],
  },
  comments: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Comments",
    },
  ],
  retirada: {
    type: Boolean,
  },
});

const Vtubers = mongoose.model("Vtubers", VtubersSchema);

module.exports = Vtubers;
