import { Router } from "express";
import CommunityRouter from "./Community/Community.router.js";
import PostRouter from "./Post/post.router.js";
import AuthRouter from "./Auth/atuh.router.js";
import connectdb from "../../db/connection.js";
import AdminRouter from "./admin/admin.router.js";
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

  // Set up the routes
  app.get("/", (req, res) => {
    return res.status(200).json({ message: "Welcome" });
  });

  app.use("/auth", AuthRouter);
  app.use("/post", PostRouter);
  app.use("/community", CommunityRouter);
  app.use("/admins", AdminRouter);
  app.get("*", (req, res) => {
    return res.status(404).json({ message: "Page not found" });
  });
};

export default initapp;