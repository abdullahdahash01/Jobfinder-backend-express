module.exports = catchAsync = (fun) => {
  return (req, res, next) => {
    fun(req, res, next).catch((err) => {
      console.log(err);
      next(err);
    });
  };
};
