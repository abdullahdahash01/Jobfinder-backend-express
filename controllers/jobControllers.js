const JobModel = require("./../models/JobModel");
const catchAsync = require("./../utils/catchAsync");

exports.getAllJobs = async (req, res, next) => {
  try {
    const { value } = req.query;
    console.log(value);

    let jobs = [];
    if (!value) {
      jobs = await JobModel.find();
    } else {
      const regex = new RegExp(value, "i"); // "i" means case-insensitive
      // const regex = "";

      jobs = await JobModel.find({
        $or: [
          { title: regex },
          { city: regex },
          { qualifications: { $elemMatch: { value: regex } } },
          { description: { $elemMatch: { value: regex } } },
          { youDo: { $elemMatch: { value: regex } } },
          { niceToHave: { $elemMatch: { value: regex } } },
          //add created by company later
        ],
      });
    }
    // console.log(jobs);

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

  const job = await JobModel.findById(jobId)
    .populate({
      path: "createdByUser",
    })
    .populate({ path: "createdByCompany" });

  res.status(200).json({
    status: "success",

    data: {
      job,
    },
  });
});

exports.addJob = catchAsync(async (req, res, next) => {
  const job = await JobModel.create(req.body);

  // use backend validation as well

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
