const express = require("express");
const {
  getJobs,
  getJobById,
  postJob,
} = require("../controllers/jobController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getJobs);
router.get("/:id", getJobById);
router.post("/", auth, postJob);

module.exports = router;
