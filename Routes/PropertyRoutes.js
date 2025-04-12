const express = require("express");
const Athontication = require("../Midelware/Authentication");
const router = express.Router();
const PropertyController = require("../Controllers/PropertyController");
router.get("/getProperty", PropertyController.getProperty);
router.get("/:id", PropertyController.id);
router.post("/addInterestedUser/:id", PropertyController.addInterestedUser);
router.delete(
  "/deleteProperty/:id",
  Athontication,
  PropertyController.deleteitem
);
router.put(
  "/updateProperty/:id",
  Athontication,
  PropertyController.UpdateProperty
);
router.post("/filter", PropertyController.filter);

module.exports = router;
