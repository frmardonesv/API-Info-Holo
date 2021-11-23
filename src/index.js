require("dotenv").config({ path: "./config.env" });
const express = require("express");
const connectDB = require("./config/db.js");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const app = express();

// Security

const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

// Connect DB

connectDB();

// ROUTES
const auth = require("./routes/auth.js");
const vtubers = require("./routes/vtubers");
const private = require("./routes/private.js");

// middleware

app.use(express.json());

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());

app.get("/", (req, res) => {
  res.send("HoloFans API");
});

// LOGIN

app.use("/api/auth", auth);
app.use("/api/private", private);

// DATA MONGO

app.use("/api/vtubers", vtubers);

// Comments

// Error Handler (Last piece of middleware)
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Servidor en puerto: ${PORT}`);
});

process.on("Unhandle rejection", (err, promise) => {
  console.log(`Error:  ${err}`);
  server.close(() => process.exit(1));
});
