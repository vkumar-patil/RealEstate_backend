const express = require("express");
const cors = require("cors");
const userRoutes = require("./Routes/userRoutes");
const AdminRoutes = require("./Routes/AdminRoutes");
const PropertyController = require("./Routes/PropertyRoutes");
const fs = require("fs");
const path = require("path"); 
require("dotenv").config();

const port = process.env.PORT || 8000;

const connectDB = require("./Config/db");

const uploadDir = path.join(__dirname, "../uploads"); 
const app = express();
app.use(cors());
app.use(express.json());

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log("Uploads folder created successfully!");
}

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/user", userRoutes);
app.use("/api/Admin", AdminRoutes);
app.use("/api/Property", PropertyController);

connectDB();

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
