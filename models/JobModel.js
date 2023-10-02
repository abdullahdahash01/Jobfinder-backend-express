const mongoose = require("mongoose");
const moment = require("moment-timezone");

const jobSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A job must have a title"],
    },
    slug: String,
    description: [
      {
        type: mongoose.Schema.Types.Object,
        required: [true, "A job must have a description"],
      },
    ],
    youDo: [
      {
        type: mongoose.Schema.Types.Object,
      },
    ],
    qualifications: [
      {
        type: mongoose.Schema.Types.Object,
        required: [true, "A job must have qualifications"],
      },
    ],
    niceToHave: [
      {
        type: mongoose.Schema.Types.Object,
      },
    ],
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
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

jobSchema.pre("save", function (next) {
  next();
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
