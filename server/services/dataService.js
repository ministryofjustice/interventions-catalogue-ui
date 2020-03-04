const superagent = require('superagent')
/** @type {any} */
// const keepaliveAgent = require('agentkeepalive')
const logger = require('../../log')

const config = require('../config')

const apiUrl = config.apis.service.url

module.exports = token => {
  const userGet = userGetBuilder(token)

  return {
    async getInterventions() {
      const path = `${apiUrl}/intervention/`
      const { status, body } = await userGet({
        path,
        raw: true,
        // headers: { Accept: 'application/json', 'Content-Type': 'application/json', responseType: 'application/json' },
      })
      return { interventions: body, exists: status !== 404, verified: status === 200 }
    },
  }
}

function userGetBuilder(token) {
  return async ({ path = null, query = '', headers = {}, responseType = '', raw = false } = {}) => {
    logger.info(`Calling service endpoint: ${path} ${query}`)
    try {
      const result = await superagent
        .get(path)
        .ok(res => res.status < 500)
        // .agent(keepaliveAgent)
        .retry(2, (err, res) => {
          if (err) logger.info(`Retry handler found API error with ${err.code} ${err.message}`)
          return undefined // retry handler only for logging retries, not to influence retry logic
        })
        .query(query)
        .auth(token, { type: 'bearer' })
        .set(headers)
        .responseType(responseType)
      return raw ? result : result.body
    } catch (error) {
      logger.warn(error, 'Error calling service')
      throw error
    }
  }
}
