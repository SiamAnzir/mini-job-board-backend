const express = require("express");
const multer = require("multer");
const path = require("path");
const { submitApplication } = require("../controllers/applicationController");

const router = express.Router();
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.post("/", upload.single("cv"), submitApplication);

module.exports = router;
