import userModel from "../../../db/modle/User.modle.js";
import logModel from "../../../db/log.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendemail } from "../../services/email.js";
import { nanoid } from "nanoid";
import { customAlphabet } from "nanoid";

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
    const token = jwt.sign({ email }, process.env.CONFIRMEMAILSECRET);

    await sendemail(
      email,
      "Confirm Email",
      `<a href='${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}'>Verify</a>` // Corrected the template string
    );

    const newUser = await userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message:
        "Your account has been successfully created! Please confirm your email address to start using the service.",
    });
  } catch (error) {
    console.error("Error in SignUp:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const confirmEmail = async (req, res) => {
  const token = req.params.token;

  try {
    const decoded = jwt.verify(token, process.env.CONFIRMEMAILSECRET);

    if (!decoded) {
      return res.status(404).json({ message: "Invalid Authorization" });
    }

    const user = await userModel.findOneAndUpdate(
      { email: decoded.email, confirmEmail: false },
      { confirmEmail: true }
    );

    if (!user) {
      return res.status(400).json({
        message: "Invalid: Email is already verified or does not exist",
      });
    }

    return res.status(200).json({ message: "Your email is verified" });
  } catch (error) {
    console.error("Error in confirmEmail:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendCode = async (req, res) => {
  const { email } = req.body;

  try {
    let code = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 4);
    code = code();

    const user = await userModel.findOneAndUpdate(
      { email },
      { sendCode: code },
      { new: true }
    );

    await sendemail(email, "Reset Password", `<h2>Code is: ${code}</h2>`);

    return res.status(200).json({ message: "Success", user });
  } catch (error) {
    console.error("Error in sendCode:", error);
    return res.status(500).json({ message: "Internal Server Error" });
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