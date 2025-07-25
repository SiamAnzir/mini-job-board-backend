const express = require("express");
const multer = require("multer");
const { submitApplication } = require("../controllers/applicationController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("cv"), submitApplication);

module.exports = router;
