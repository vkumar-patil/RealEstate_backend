const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../Models/UserModle");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;
exports.Register = async (req, res) => {
  try {
    const { username, email, contact, password } = req.body;

    if (!username || !email || !contact || !password) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists");
      return res.status(400).send({ message: "User already exists" });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      contact,
      password: hashpassword,
    });

    await newUser.save();
    res.status(201).send({ message: "Registration successful", success: true });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        email: user.email,
        contact: user.contact,
        Admin: user.Admin,
      },
      JWT_SECRET,
      { expiresIn: "1hr" }
    );
    res.status(200).send({
      message: "Login successful",
      token,
      user: {
        userId: user.id,
        username: user.username,
        email: user.email,
        contact: user.contact,
        Admin: user.Admin,
      },
      success: true,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({ message: "Login failed" });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); 
    const user = await User.findById(decodedToken.userId); 

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error decoding token:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
