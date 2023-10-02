const mongoose = require("mongoose");

const jobSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A job must have a title"],
    },
    slug: String,
    description: {
      type: [String],
      required: [true, "A job must have a description"],
    },
    youDo: {
      type: [String],
    },
    qualifications: {
      type: [String],
      required: [true, "A job must have a qualifications"],
    },
    niceToHave: {
      type: [String],
    },
    additionalInfo: String,
    company: String,
    salary: String,
    contact: String,
    city: String,

    //parent referencing
    createdByUser: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    createdByCompany: {
      type: mongoose.Schema.ObjectId,
      ref: "Company",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
