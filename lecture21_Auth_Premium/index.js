const express = require("express");
const connectDB = require("./db/connectDd");
const app = express();
const PORT = 5000;
require("dotenv").config();
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    // "preflightContinue": false,
    // "optionsSuccessStatus": 204,
    // cors acces to cookies
    credentials: true,
  })
);

// router
const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.route");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.get("/", (req, res) => {});

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log("Server running on port " + PORT));
  })
  .catch((error) => console.log(error));
