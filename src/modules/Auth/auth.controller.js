// auth.controller.js
import userModel from "../../../db/modle/User.modle.js";
import logModel from "../../../db/log.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendemail } from "../../services/email.js";

export const SignUp = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (user) {
      return res.status(409).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.saltRounds)
    );

    const newUser = await userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ email }, process.env.CONFIRMEMAILSECRET);
    // Send confirmation email
    try {
      await sendemail(
        email,
        "Confirm Email",
        `<a href='http://localhost:3000/auth/confirmEmail/${token}'>Verify</a>`
      );
    } catch (emailError) {
      console.error("Error sending confirmation email:", emailError);
      // Log the email sending error, but continue with the sign-up process
    }

    const userLog = await logModel.create({
      email,
      password: hashedPassword,
      role: "user",
    });

    return res.status(201).json({
      message: "User created successfully",
      userLog,
    });
  } catch (error) {
    console.error("Error in SignUp:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const confirmEmail= async (req, res) => {
  try {
    const token = req.params.token;
    const decoded = jwt.verify(token.process.env.CONFIRMEMAILSECRET);
    if (!decoded) {
      return res.status(404).json({ message: "Invalid Authorization" });
    }
    const user=await userModel
    return res.json({ token });
  } catch (error) {
    console.error("Error in ConfirmEmail:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export const SignIn = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await logModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: `Invalid password for user ${email}` });
    }

    const token = jwt.sign(
      { email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "30m" }
    );
    const refreshtoken = jwt.sign(
      { email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: 60 * 60 * 24 * 30 }
    );
    return res.status(200).json({
      message: "User signed in successfully",
      token,
      refreshtoken,
    });
  } catch (error) {
    console.error(`Error in SignIn for user ${email}:`, error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
