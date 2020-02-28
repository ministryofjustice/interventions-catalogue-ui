require('dotenv').config()

const production = process.env.NODE_ENV === 'production'

function get(name, fallback, options = {}) {
  if (process.env[name]) {
    return process.env[name]
  }
  if (fallback !== undefined && (!production || !options.requireInProduction)) {
    return fallback
  }
  throw new Error(`Missing env var ${name}`)
}

const requiredInProduction = { requireInProduction: true }

module.exports = {
  session: {
    secret: get('SESSION_SECRET', 'app-insecure-default-session', requiredInProduction),
    expiryMinutes: get('WEB_SESSION_TIMEOUT_IN_MINUTES', '120', true),
  },
  apis: {
    oauth2: {
      url: get('NOMIS_AUTH_URL', 'http://localhost:9090/auth', requiredInProduction),
      externalUrl: get('NOMIS_AUTH_EXTERNAL_URL', get('NOMIS_AUTH_URL', 'http://localhost:9090/auth')),
      timeout: {
        response: get('AUTH_ENDPOINT_TIMEOUT_RESPONSE', 10000),
        deadline: get('AUTH_ENDPOINT_TIMEOUT_DEADLINE', 10000),
      },
      agent: {
        maxSockets: 100,
        maxFreeSockets: 10,
        freeSocketTimeout: 30000,
      },
      apiClientId: get('API_CLIENT_ID', 'interventions-catalogue-client', requiredInProduction),
      apiClientSecret: get('API_CLIENT_SECRET', 'clientsecret', requiredInProduction),
      // systemClientId: get('SYSTEM_CLIENT_ID', get('API_CLIENT_ID', 'use-of-force-system'), requiredInProduction),
      // systemClientSecret: get('SYSTEM_CLIENT_SECRET', get('API_CLIENT_SECRET', 'clientsecret'), requiredInProduction),
    },
    service: {
      url: get('SERVICE_ENDPOINT_URL', 'http://localhost:8080', requiredInProduction),
      timeout: {
        response: get('SERVICE_ENDPOINT_TIMEOUT_RESPONSE', 10000),
        deadline: get('SERVICE_ENDPOINT_TIMEOUT_DEADLINE', 10000),
      },
      agent: {
        maxSockets: 100,
        maxFreeSockets: 10,
        freeSocketTimeout: 30000,
      },
    },
  },
  domain: `${get('INGRESS_URL', 'http://localhost:3000', requiredInProduction)}`,
  links: {
    exitUrl: get('EXIT_LOCATION_URL', '/', requiredInProduction),
  },
  https: production,
}
