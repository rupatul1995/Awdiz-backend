import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body?.userData;
    if (!email || !password) {
      return res.json({ success: false, error: "All fields are required." });
    }

    const isUserExists = await User.findOne({ email: email });
    if (!isUserExists) {
      return res.json({ success: false, error: "Email not found." });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      isUserExists.password
    );
    console.log(isPasswordCorrect, "isPasswordCorrect");
    if (!isPasswordCorrect) {
      return res.json({ success: false, error: "Password is wrong." });
    }
    const userData = { name: isUserExists.name, email: isUserExists.email };
    
    const token = await jwt.sign(
      { userId: isUserExists._id },
      process.env.JWT_SECRET
    );

    res.cookie("token", token);
    return res.json({
      success: true,
      message: "Login successfull.",
      userData,
    });
  } catch (error) {
    return res.json({ success: falsse, error: error });
  }
};





export const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body.userData;
    if (!name || !email || !password) {
      return res.json({ success: false, error: "All fields are required." });
    }
    const isEmailExist = await User.findOne({ email: email });
    console.log(isEmailExist,"isEmailExist");
    if (isEmailExist) {
      return res.json({
        encryptedPassword,
        success: false,
        error: "Email is exists, please use another one.",
      });
    }
    // encrypt the password then store it in mongodb

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: name,
      email: email,
      password: encryptedPassword,
    });

    const responseFromDb = await newUser.save();

    return res.json({
      encryptedPassword,
      isEmailExist,
      success: true,
      responseFromDb,
      message: "Registeration Successfull.",
    });
  } catch (error) {
    console.log(error, "error");
    return res.json({ error: error, success: false });
  }
};
