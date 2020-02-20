const express = require('express')
const flash = require('connect-flash')
const bodyParser = require('body-parser')
const asyncMiddleware = require('../middleware/asyncMiddleware')

module.exports = function Index({ authenticationMiddleware }) {
  const router = express.Router()

  router.use(authenticationMiddleware())
  router.use(bodyParser.urlencoded({ extended: false }))
  router.use(flash())

  router.use((req, res, next) => {
    if (typeof req.csrfToken === 'function') {
      res.locals.csrfToken = req.csrfToken()
    }
    next()
  })

  const get = (path, handler) => router.get(path, asyncMiddleware(handler))
  const post = (path, handler) => router.post(path, asyncMiddleware(handler))

  // get('/:reportId/report-sent', incidents.viewReportSent)

  return router
}
