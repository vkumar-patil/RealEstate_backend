const express = require("express");
const Admin = require("../Models/AdminModle");

exports.Addproduct = async (req, res) => {
  const {
    title,
    budget,
    propertyStatus,
    bedroom,
    address,
    description,
    features,
    propertySize,
    propertyType,
    garage,
    city,
    state,
    country,
    location,
    pincode,
    bathroom,
    buildyear,
  } = req.body;

  try {
    const newproduct = new Admin({
      title,
      budget,
      propertyStatus,
      bedroom,
      address,
      description,
      features: typeof features === "string" ? JSON.parse(features) : features,
      propertySize,
      propertyType,
      garage,
      city,
      state,
      country,
      location,
      pincode,
      bathroom,
      buildyear,
      Image: req.files?.map((file) => file.filename),
    });
    await newproduct.save();
    res.status(200).send({ message: "Property adding done", success: true });
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: "Error adding property", success: false });
  }
};
