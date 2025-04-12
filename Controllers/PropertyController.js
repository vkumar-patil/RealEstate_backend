const mongoose = require("mongoose");
const Admin = require("../Models/AdminModle");

exports.getProperty = async (req, res) => {
  try {
    const admindata = await Admin.find();
    const dataWithLinks = admindata.map((item) => ({
      ...item._doc,
      Image: `http://localhost:8000/uploads/${item.Image}`, // Ensure path is correct
    }));

    res.status(200).send({
      message: "data retrieval successful",
      success: true,
      data: dataWithLinks,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "data not found", success: false, error: error });
  }
};

exports.id = async (req, res) => {
  const PropertyId = req.params.id;
  try {
    const property = await Admin.findById(PropertyId);
    const dataWithLinks = {
      ...property._doc,
      Image: `http://localhost:8000/uploads/${property.Image}`, // Ensure path is correct
    };
    res
      .status(200)
      .send({ message: "ID fetch successful", data: dataWithLinks });
  } catch (error) {
    res.status(500).send({ message: "data not found", error: error });
  }
};

exports.addInterestedUser = async (req, res) => {
  const propertyId = req.params.id;
  const { username, email, contact } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({ message: "Invalid property ID format" });
    }

    const property = await Admin.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    if (!Array.isArray(property.interestedUsers)) {
      property.interestedUsers = [];
    }

    property.interestedUsers.push({ username, email, contact });
    await property.save();

    res.status(200).json({ message: "User added successfully", property });
  } catch (error) {
    console.error("Error adding interested user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteitem = async (req, res) => {
  const propertyId = req.params.id;
  console.log(propertyId);
  // Explicitly cast the propertyId to an ObjectId
  if (!mongoose.Types.ObjectId.isValid(propertyId)) {
    return res.status(400).json({ message: "Invalid property ID" });
  }

  try {
    const property = await Admin.findByIdAndDelete(propertyId);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error("Error deleting property:", error);
    res.status(500).json({ message: "Failed to delete property" });
  }
};

exports.UpdateProperty = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedProperty = await Admin.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json({
      message: "Property updated successfully",
      data: updatedProperty,
    });
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.filter = async (req, res) => {
  try {
    const { city ,budget} = req.body;

    if (!city) {
      return res.status(400).send({ message: "City is required" });
    }

    const filtered = await Admin.find({ city: city ,budget:budget}); 

    if (filtered.length === 0) {
      return res
        .status(404)
        .send({ message: "No properties found for this city" });
    }

    res.status(200).send({ data: filtered });
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
};
