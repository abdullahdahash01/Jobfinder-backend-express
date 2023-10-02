const CompanyModel = require("./../models/CompanyModel");
const catchAsync = require("./../utils/catchAsync");

exports.getAllCompanies = async (req, res, next) => {
  const companies = await CompanyModel.find();

  res.status(200).json({
    status: "success",
    results: companies.length,
    data: {
      companies,
    },
  });
};

exports.getCompany = catchAsync(async (req, res, next) => {
  const companyId = req.params.id;

  const Company = await CompanyModel.findById(companyId);

  res.status(200).json({
    status: "success",

    data: {
      Company,
    },
  });
});

exports.addCompany = catchAsync(async (req, res, next) => {
  const Company = await CompanyModel.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      Company,
    },
  });
});

exports.modifyCompany = catchAsync(async (req, res, next) => {
  const companyId = req.params.id;
  const Company = await CompanyModel.findByIdAndUpdate(companyId, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",

    data: {
      Company,
    },
  });
});

exports.deleteCompany = catchAsync(async (req, res, next) => {
  const companyId = req.params.id;

  const Company = await CompanyModel.findByIdAndDelete(companyId);

  res.status(204).json({
    status: "success",
  });
});
