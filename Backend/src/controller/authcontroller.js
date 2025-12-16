const jwt = require('jsonwebtoken')
const bcrypt = require ("bcrypt")
const user = require ('../models/user')
const {nanoid} = require('nanoid')
const message = require('../models/message')


exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const uniqueID = nanoid(8);

    const newUser = await user.create({
      name,
      email,
      password: hashPassword,
      uniqueID,
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        uniqueID: newUser.uniqueID,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Signup failed" });
  }
};


exports.login = async (req, res) => {
  try {
    console.log("LOGIN BODY:", req.body);
    const { email, password } = req.body;
    

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const existingUser = await user.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
        name: existingUser.name,
        uniqueID: existingUser.uniqueID,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES || "7d" } 
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,       
      sameSite: "none",    
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    res.status(200).json({
      message: "login successful",
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        uniqueID: existingUser.uniqueID,
        createdAt: existingUser.createdAt,
      },
      token,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Login failed" });
  }
};


exports.logout=async (req,res) => {
    try {
        res.clearCookie("token",{
            httpOnly : true,
            secure : true,
            sameSite : "none",
            path: "/",
        })
        res.status(200).json({message:"logout successful"})

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error"})
    }
}

exports.verifyUser = async (req,res) => {
    res.json({user : req.user})
}


exports.profile= async (req,res) => {
    try {
        res.status(200).json({
            message:"you are authorised",
            user:req.user,
        })


    } catch (error) {
        console.log(error,"cannot access profile")
        res.status(500).json({message:"server error"})
    }
}
