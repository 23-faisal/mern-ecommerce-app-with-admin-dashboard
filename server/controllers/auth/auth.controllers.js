import bcrypt from "bcryptjs";
import User from "../../models/User.model.js";

// register a user

const RegisterUser = async (req, res) => {
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
      message: "Error registering user",
      error: error.message,
    });
  }
};

// login a user


// logout a user

// auth middlewares

export default RegisterUser;
