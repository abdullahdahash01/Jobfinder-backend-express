const express = require("express");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const jobRouter = require("./routes/jobRoutes");
const userRouter = require("./routes/userRoutes");
const companyRouter = require("./routes/companyRoutes");

const app = express();

const morgan = require("morgan");

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/jobs", jobRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/companies", companyRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
