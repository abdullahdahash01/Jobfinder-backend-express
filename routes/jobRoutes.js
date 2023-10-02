const express = require("express");
const jobController = require("./../controllers/jobControllers");
const authController = require("./../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(authController.protect, jobController.getAllJobs)
  .post(jobController.addJob);
router
  .route("/:id")
  .get(jobController.getJob)
  .patch(jobController.modifyJob)
  .delete(jobController.deleteJob);

module.exports = router;
