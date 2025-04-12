const express = require("express");
const AdminController = require("../Controllers/AdminController");
const Inquirycontroller = require("../Controllers/InquiryController");
const upload = require("../Midelware/Multer");
const router = express.Router();
const Authentication = require("../Midelware/Authentication");
router.post(
  "/Addproduct",
  upload.array("Image", 10),
  Authentication,
  AdminController.Addproduct
);

router.post("/AddInquiry",Authentication,
  Inquirycontroller.AddInquiry);
router.get("/getInquiry",Authentication,
  Inquirycontroller.getInquiryNotification);
router.get("/getfilterdata", AdminController.getFilteredProperties);

module.exports = router;
