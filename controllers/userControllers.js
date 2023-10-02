const UserModel = require("./../models/UserModel");
const catchAsync = require("./../utils/catchAsync");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find();

    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getUser = catchAsync(async (req, res, next) => {
  const userId = req.params.id;

  const user = await UserModel.findById(userId).populate({
    path: "favoriteJobs",
  });

  res.status(200).json({
    status: "success",

    data: {
      user,
    },
  });
});

exports.addUser = catchAsync(async (req, res, next) => {
  const { email, password, passwordConfirm, name, lastName, city, phone } =
    req.body;
  const user = await UserModel.create({
    email,
    password,
    passwordConfirm,
    name,
    lastName,
    city,
    phone,
  });

  res.status(201).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.modifyUser = catchAsync(async (req, res, next) => {
  const userId = req.params.id;
  const user = await UserModel.findByIdAndUpdate(userId, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",

    data: {
      user,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const userId = req.params.id;

  const user = await UserModel.findByIdAndDelete(userId);

  res.status(204).json({
    status: "success",
  });
});

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  console.log(req.user);
  next();
};

exports.deleteMe = catchAsync(async (req, res, next) => {
  await UserModel.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm)
    return next(
      new AppError(
        "This route is NOT for password update. Please use /updatePassword",
        400
      )
    );

  const { email, name, lastName, favoriteJobs } = req.body;

  if (req.body.favoriteJobs !== null || req.body.favoriteJobs !== []) {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user.id,
      { email: email, name: name, lastName: lastName, favoriteJobs },
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      status: "success",
      data: {
        user: updatedUser,
      },
    });
  }

  const updatedUser = await UserModel.findByIdAndUpdate(
    req.user.id,
    { email: email, name: name, lastName: lastName },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});
