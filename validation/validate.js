const { validationResult } =  require("express-validator")

const validate =  (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }

  return res.status(400).json({
    errors: errors.mapped(),
    message: "Bad request",
  })
}
module.exports= validate
