import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const AdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body?.adminData;
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
    const adminData = { name: isUserExists.name, email: isUserExists.email };
    // add user data (context), add jwt token,

    const token = await jwt.sign(
      { userId: isUserExists._id },
      process.env.JWT_SECRET
    );

    res.cookie("token", token);
    return res.json({
      success: true,
      message: "Login successfull.",
      adminData,
    });
  } catch (error) {
    return res.json({ success: false, error: error });
  }
};



export const AdminRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body.adminData;
    if (!name || !email || !password) {
      return res.json({ success: false, error: "All fields are required." });
    }
    const isEmailExist = await User.findOne({ email: email });
    console.log(isEmailExist,"isEmailExist");
    if (isEmailExist) {
      return res.json({
        // encryptedPassword,
        success: false,
        error: "Email is exists, please use another one.",
      });
    }


    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: name,
      email: email,
      password: encryptedPassword,
    });

    const responseFromDb = await newUser.save();

    return res.json({
      success: true,
      message: "Registeration Successfull.",
    });
  } catch (error) {
    console.log(error, "error");
    return res.json({ error: error, success: false });
  }
};