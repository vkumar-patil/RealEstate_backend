const mongoose = require("mongoose");

const InquirySchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, match: /\S+@\S+\.\S+/ },
  contact: { type: String, required: true, match: /^[0-9]+$/ },
  message: { type: String, required: true },
});

module.exports = mongoose.model("InquiryUser", InquirySchema);
