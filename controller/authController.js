import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//new user registration

export const registerUser = async (req, res) => {


  const { email } = req.body;
  const existingUser = await userModel.findOne({ email });

  try {
    if (existingUser) {
      res.status(200).json({ message: "User already exists" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashedPassword;

      const newUser = new userModel(req.body);
      const savedUser = await newUser.save();


      const token = jwt.sign(
        { email: savedUser.email, id: savedUser._id },
        process.env.JWT_KEY,
        { expiresIn: "5m" }
      );

      const { password: userPassword, ...others } = savedUser._doc;

      res.status(200).json({ user: others, token });

    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// user login

export const loginUser = async (req, res) => {


  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (user) {
      const passwordValidity = await bcrypt.compare(password, user.password);
      if (!passwordValidity) {
        res.status(500).json({ message: "Wrong Password" });
      } else {
        const token = jwt.sign(
          {
            email: user.email,
            id: user._id,
          },
          process.env.JWT_KEY,
          { expiresIn: "1d" }
        );

        const { password, ...others } = user._doc;

        res.status(200).json({ user: others, token });
      }
    } else {
      res.status(500).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
