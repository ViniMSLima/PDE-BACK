const express = require("express");
const CarController = require("../controller/carController");
const router = express.Router();

router
  .get("/getcars", CarController.getCars)
  .get("/getuserbycarplate", CarController.getCarByCarPlate)

  .post("/postcar", CarController.postCar)

  .delete("/deleteuser", CarController.deleteById);
module.exports = router;
