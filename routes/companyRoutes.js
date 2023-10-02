const express = require("express");
const companyControllers = require("./../controllers/companyControllers");

const router = express.Router();

router
  .route("/")
  .get(companyControllers.getAllCompanies)
  .post(companyControllers.addCompany);
router
  .route("/:id")
  .get(companyControllers.getCompany)
  .patch(companyControllers.modifyCompany)
  .delete(companyControllers.deleteCompany);

module.exports = router;
