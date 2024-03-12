import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import api from "./router/api.js";

//configs
const app = express();
app.use(express.json());
app.use(helmet());
app.use(morgan("tiny"));
app.use(cors());

//testing route
app.get("/", (req, res) => {
  res.json({
    status: 200,
    statusText: "OK",
    messege: "server is runnig on port: " + process.env.PORT,
  });
});

//route
app.use("/api/v0/", api);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT || 8080, () => {
      console.log("app is runnig on port " + process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
