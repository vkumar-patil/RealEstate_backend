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

// exports.getPropertydata = async (req, res) => {
//   const { location, propertySize, bedrooms, maxPrice } = req.query;

//   try {
//     const filter = {};

//     // Mandatory: Match location first
//     if (location && location !== "allCities") filter.city = location;

//     // Conditional: Apply other filters only if location matches
//     if (propertySize && propertySize !== "allSizes")
//       filter.propertySize = propertySize;

//     if (bedrooms && bedrooms !== "any") filter.bedroom = bedrooms;

//     if (maxPrice && maxPrice !== "any") {
//       filter.budget = { $lte: Number(maxPrice) }; // Less than or equal to maxPrice
//     }

//     // Query the database with the prioritized filter
//     const admindata = await Admin.find(filter);

//     const dataWithLinks = admindata.map((item) => ({
//       ...item._doc,
//       Image: item.Image
//         ? item.Image.split(",").map(
//             (fileName) => `http://localhost:8000/uploads/${fileName}`
//           )
//         : [],
//     }));
//     res.status(200).send({
//       message: "Data retrieval successful",
//       success: true,
//       data: dataWithLinks,
//     });
//   } catch (error) {
//     res.status(500).send({
//       message: "Data not found",
//       success: false,
//       error: error.message,
//     });
//   }
// };

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
    // Validate property ID
    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({ message: "Invalid property ID format" });
    }

    // Find the property
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
    // Find the property by ID and update it
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
