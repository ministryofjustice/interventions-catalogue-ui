const { stubFor } = require('./wiremock')

const stubInterventions = () =>
  stubFor({
    request: {
      method: 'GET',
      urlPattern: `/service/intervention/`,
    },
    response: {
      status: 200,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      jsonBody: [
        {
          id: 1,
          name: 'Building Better Relationships',
        },
        {
          id: 2,
          name: 'Violence Booster',
        },
      ],
    },
  })

module.exports = {
  stubInterventions,
}
