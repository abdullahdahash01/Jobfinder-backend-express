const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: `${__dirname}/config.env` });
const JobModel = require("./models/JobModel");

const db = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(db, {
    // just some options to deal with deprecation warnings.
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

console.log(process.argv);

if (process.argv[2] === "--delete") {
  JobModel.deleteMany()
    .then(() => {
      console.log("data deleted successfully");
    })
    .catch((err) => console.log(err));
}
