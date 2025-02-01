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

exports.getFilteredProperties = async (req, res) => {
  const { city, minBudget, maxBudget, propertyType } = req.query;

  try {
    const pipeline = [];

    // **1️⃣ Filtering by City**
    if (city) {
      pipeline.push({ $match: { city } });
    }

    // **2️⃣ Filtering by Price Range**
    if (minBudget || maxBudget) {
      let priceFilter = {};
      if (minBudget) priceFilter.$gte = parseInt(minBudget);
      if (maxBudget) priceFilter.$lte = parseInt(maxBudget);
      pipeline.push({ $match: { budget: priceFilter } });
    }

    // **3️⃣ Filtering by Property Type**
    if (propertyType) {
      pipeline.push({ $match: { propertyType } });
    }

    // **4️⃣ Sorting by Budget (Ascending)**
    pipeline.push({ $sort: { budget: 1 } });

    // **5️⃣ Pagination (Optional)**
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    pipeline.push({ $skip: skip }, { $limit: limit });

    // **6️⃣ Execute Aggregation**
    const properties = await Admin.aggregate(pipeline);
    res.status(200).json(properties);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching properties", success: false });
  }
};
