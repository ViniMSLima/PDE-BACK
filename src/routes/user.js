const express = require("express");
const userController = require("../controller/userController");
const router = express.Router();

router
  .get("/getusers", userController.getUsers)
  .get("/deleteusers", userController.clearUsers)

  .post("/postuser", userController.postUser)

  .delete("/clearusers", userController.clearUsers)
  .delete("/deleteuser", userController.deleteById);
module.exports = router;
