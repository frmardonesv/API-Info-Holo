require("dotenv").config({ path: "./config.env" });
const express = require("express");
const connectDB = require("./config/db.js");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const app = express();

// Connect DB

connectDB();

// ROUTES
const auth = require("./routes/auth.js");
const vtubers = require("./routes/vtubers");
const private = require("./routes/private.js");
const comment = require("./routes/comment.js");

// middleware

app.use(cors());
app.use(express.json());

// LOGIN
app.use("/api/auth", auth);
app.use("/api/private", private);

// DATA MONGO

app.use("/api/vtubers", vtubers);

// Comments

app.use("/api/comment", comment);

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
