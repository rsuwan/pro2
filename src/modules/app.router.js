import { Router } from "express";
import CommunityRouter from "./Community/Community.router.js";
import PostRouter from "./Post/post.router.js";
import AuthRouter from "./Auth/atuh.router.js";
import connectdb from "../../db/connection.js";
import { sendemail } from "../services/email.js";
const initapp = async (app, express) => {
  const router = Router();
  app.use(express.json());
  // Connect to the database
  try {
    await connectdb();
    console.log("Database connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  // Send the email
  try {
    await sendemail("r.r.suwan2001@gmail.com", "test", "<h2>hi</h2>");
    console.log("Email sent");
  } catch (error) {
    console.error(error);
  }

  // Set up the routes
  app.get("/", (req, res) => {
    return res.status(200).json({ message: "Welcome" });
  });

  app.use("/auth", AuthRouter);
  app.use("/post", PostRouter);
  app.use("/community", CommunityRouter);

  app.get("*", (req, res) => {
    return res.status(404).json({ message: "Page not found" });
  });
};

export default initapp;
