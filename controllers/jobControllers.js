const JobModel = require("./../models/JobModel");
const catchAsync = require("./../utils/catchAsync");

exports.getAllJobs = async (req, res, next) => {
  try {
    const jobs = await JobModel.find();

    res.status(200).json({
      status: "success",
      results: jobs.length,
      data: {
        jobs,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getJob = catchAsync(async (req, res, next) => {
  const jobId = req.params.id;

  const job = await JobModel.findById(jobId).populate({
    path: "createdByUser",
  });

  res.status(200).json({
    status: "success",

    data: {
      job,
    },
  });
});

exports.addJob = catchAsync(async (req, res, next) => {
  const job = await JobModel.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      job,
    },
  });
});

exports.modifyJob = catchAsync(async (req, res, next) => {
  const jobId = req.params.id;
  const job = await JobModel.findByIdAndUpdate(jobId, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",

    data: {
      job,
    },
  });
});

exports.deleteJob = catchAsync(async (req, res, next) => {
  const jobId = req.params.id;

  const job = await JobModel.findByIdAndDelete(jobId);

  res.status(204).json({
    status: "success",
  });
});
