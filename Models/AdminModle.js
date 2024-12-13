const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  title: { type: String, required: true },
  budget: { type: String, required: true },
  propertyStatus: { type: String, required: true },
  bedroom: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String, required: true },
  features: { type: [String], required: true },
  propertySize: { type: String, required: true },
  propertyType: { type: String, required: true },
  garage: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  location: { type: String, require: true },
  pincode: { type: String, require: true },
  bathroom: { type: String, require: true },
  buildyear: { type: String, require: true },
  Image: { type: [String], required: true },
  interestedUsers: [
    {
      username: { type: String, required: true },
      email: { type: String, required: true },
      contact: { type: String, required: true },
    },
  ],
});

const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
