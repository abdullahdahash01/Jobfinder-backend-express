const express = require("express");
const jobController = require("./../controllers/jobControllers");

const router = express.Router();

router.route("/").get(jobController.getAllJobs).post(jobController.addJob);
router
  .route("/:id")
  .get(jobController.getJob)
  .patch(jobController.modifyJob)
  .delete(jobController.deleteJob);

module.exports = router;
