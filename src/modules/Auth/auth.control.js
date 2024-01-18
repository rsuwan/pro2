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
      return res.status(409).json({ message: "Email already exists" });
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
      confirmEmail: false,
    });

    const token = jwt.sign({ email }, process.env.CONFIRMEMAILSECRET);

    // **Add the following line to send the email:**
    await sendemail(email, "Confirm Email", `<a href='${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}'>Verify</a>`);

    const userLog = await logModel.create({
      email,
      password: hashedPassword,
      role: "user",
    });

    return res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });

  } catch (error) {
    console.error("Error in signUp:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const confirmEmail = async (req, res) => {
  const token = req.params.token;

  try {
    // فحص صحة الرمز باستخدام المفتاح السري
    const decodedToken = jwt.verify(token, process.env.CONFIRMEMAILSECRET);

    // التحقق من نجاح عملية الفحص
    if (!decodedToken) {
      return res.status(404).json({ message: "Invalid Authorization Token" });
    }

    // تحديث حالة التأكيد في قاعدة البيانات
    const updatedUser = await userModel.findOneAndUpdate(
      { email: decodedToken.email, confirmEmail: false },
      { confirmEmail: true },
      { new: true }
    );

    // التحقق من نجاح عملية التحديث
    if (!updatedUser || !updatedUser.confirmEmail) {
      return res.status(400).json({
        message: "Invalid: Email is already verified or does not exist",
      });
    }

    // رسالة نجاح التحقق
    return res.status(200).json({ message: "Your email is verified" });
  } catch (error) {
    // التعامل مع الأخطاء
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
    const userconfirm = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    else if (!userconfirm.confirmEmail) {
      return res.status(401).json({ message: "Email not confirmed" });
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
      
        email: user.email,
        role: user.role,
      
      token: token,
      refreshtoken,
    });
  } catch (error) {
    console.error(`Error in SignIn for user ${email}:`, error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};