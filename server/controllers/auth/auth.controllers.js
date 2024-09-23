import bcrypt from "bcryptjs";
import User from "../../models/User.model.js";
import jwt from "jsonwebtoken";

// register a user

export const RegisterUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ userName }, { email }],
    });

    if (existingUser) {
      // If userName or email exists, return an error
      return res.status(400).json({
        success: false,
        message: "Username or email already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    const { password: _, ...userResponse } = newUser.toObject(); // Destructure to exclude password
    // Send success response
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: userResponse,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
      error: error.message,
    });
  }
};

// login a user

export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (!userExists) {
      return res.status(400).json({
        success: false,
        message: "Invalid email! Please try again",
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, userExists.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Opps! Wrong password",
      });
    }

    // generate token
    const token = await jwt.sign(
      { id: userExists._id, role: userExists.role, email: userExists.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        success: true,
        message: "User logged in successfully",
        token,
        user: {
          email: userExists.email,
          role: userExists.role,
          id: userExists._id,
        },
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
      error: error.message,
    });
  }
};

// logout a user
