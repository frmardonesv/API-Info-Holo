require("dotenv").config({ path: "./config.env" });

const vtubersData = require("./data/data.json");
const connectDB = require("./config/db");
const Vtubers = require("./models/Vtubers");

connectDB();

const poblacionData = async () => {
  try {
    await Vtubers.deleteMany({});

    await Vtubers.insertMany(vtubersData);

    console.log("Población completa");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

poblacionData();
