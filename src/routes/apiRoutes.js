const express = require("express");
const router = express.Router();
const controller = require("../controllers/apiController");

router.get("/", controller.getHome);

router.get("/register", controller.getRegisterForm);
router.post("/register", controller.postRegistration);

router.get("/candidates", controller.getCandidates);

module.exports = router;
