module.exports = (req, res, next) => {
  if (res.locals && res.locals.user && res.locals.user.token) {
    return next()
  }
  req.session.returnTo = req.originalUrl
  return res.redirect('/login')
}
