const InquiryUser = require("../Models/inquiryModle");

exports.AddInquiry = async (req, res) => {
  const { username, email, contact, message } = req.body;
  try {
    const newInquiry = await new InquiryUser({
      username,
      email,
      contact,
      message,
    });
    await newInquiry.save();
    res.status(201).send({ message: "inquiry data aded" });
  } catch (error) {
    res.status(400).send({ message: "inquiry data not aded" });
  }
};

exports.getInquiryNotification = async (req, res) => {
  try {
    const getinquiry = await InquiryUser.find();
    res
      .status(200)
      .send({ message: "data fech done", success: true, data: getinquiry });
  } catch (error) {
    res.status(400).send({ message: "data not found", error });
  }
};
