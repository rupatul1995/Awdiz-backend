export const Login = (req, res) => {
    res.send("Login completed.");
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


