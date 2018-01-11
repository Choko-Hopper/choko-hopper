const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    let error = new Error('Unauthorized Action')
    error.status = 403
    next(error)
  }
}

module.exports = isAdmin
