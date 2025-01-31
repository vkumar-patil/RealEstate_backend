const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./Routes/userRoutes");
const AdminRoutes = require("./Routes/AdminRoutes");
const PropertyController = require("./Routes/PropertyRoutes");
const fs = require("fs");
const path = require("path"); // Import the path module
const port = 8000;

const connectDB = require("./Config/db");

const uploadDir = path.join(__dirname, "../uploads"); // Fixed spelling: 'uplods' -> 'uploads'
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

// Ensure the uploads directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log("Uploads folder created successfully!");
}

// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/user", userRoutes);
app.use("/api/Admin", AdminRoutes);
app.use("/api/Property", PropertyController);

connectDB();

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
