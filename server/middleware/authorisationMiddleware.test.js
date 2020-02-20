const jwt = require('jsonwebtoken')

const authorisationMiddleware = require('./authorisationMiddleware')

const createToken = authorities => {
  const payload = {
    user_name: 'ITAG_USER',
    scope: ['read', 'write'],
    auth_source: 'nomis',
    ...authorities,
    jti: '83b50a10-cca6-41db-985f-e87efb303ddb',
    client_id: 'use-of-force-client',
  }

  const token = jwt.sign(payload, 'secret', { expiresIn: '1h' })
  return token
}

describe('authorisationMiddleware', () => {
  let req
  const next = jest.fn()

  describe('when there is an authenticated user', () => {
    const createResWithToken = authorities => ({
      locals: {
        user: {
          token: createToken(authorities),
        },
      },
    })

    test('Should have a user', () => {
      const res = createResWithToken({ authorities: ['ROLE_USE_OF_FORCE_REVIEWER'] })

      authorisationMiddleware(req, res, next)

      expect(res.locals.user).toBeDefined()
    })
  })
})
