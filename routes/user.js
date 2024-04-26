const express = require("express");
const userController = require("../controllers/userController");
const { createUserValidation,updateUserValidation,statusUserValidation } = require("../validation/userValidation");
const validate = require("../validation/validate");


const router = express.Router();

router.post("/", createUserValidation(),validate,userController.create);
router.get("/", userController.get);
router.get("/:id", userController.getById);
router.put("/:id", updateUserValidation(),validate,userController.update);
router.delete("/:id", userController.delete);
router.get("/job/:status", statusUserValidation(),validate,userController.getByStatus);

module.exports = router;
