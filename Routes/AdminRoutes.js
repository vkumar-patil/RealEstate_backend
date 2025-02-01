const express = require("express");
const AdminController = require("../Controllers/AdminController");
const Inquirycontroller = require("../Controllers/InquiryController");
//const Athontication = require("../Midelware/Authentication");
const upload = require("../Midelware/Multer");
const router = express.Router();
router.post(
  "/Addproduct",
  upload.array("Image", 10),
  AdminController.Addproduct
);

router.post("/AddInquiry", Inquirycontroller.AddInquiry);
router.get("/getInquiry", Inquirycontroller.getInquiryNotification);
router.get("/getfilterdata", AdminController.getFilteredProperties);
module.exports = router;
