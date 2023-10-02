const mongoose = require("mongoose");
const validator = require("validator");

const companySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A company has to have a name"],
    },
    email: {
      type: String,
      validate: {
        validator: function (val) {
          return validator.isEmail(val);
        },
        message: "Email is invalid",
      },
      required: [true, "a user must have email"],
      city: String,
      industry: String,
      phone: {
        type: String,
        validate: {
          validator: function (val) {
            return validator.isMobilePhone(val, "en-US");
          },
        },
      },
    },
    subscribed: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
