import userModel from "../../../db/modle/User.modle.js";
import logModel from "../../../db/log.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const SignUp = async (req, res) => {
  const { firstName, lastName,email , password } = req.body;

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
    });

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
        return res.status(401).json({ message: "Invalid password" });
      }
  
      const token = jwt.sign(
        { email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "30m" }      );
      const refreshtoken=jwt.sign(
        { email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: 60*60*24*30 }
      );
      return res.status(200).json({
        message: "User signed in successfully",
        token,refreshtoken
      });
      
    } catch (error) {
      console.error("Error in SignIn:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
  