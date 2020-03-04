const dataServiceBuilder = require('../services/dataService')

module.exports = function Home() {
  return {
    index: async (req, res) => {
      const client = dataServiceBuilder(res.locals.user.token)
      const response = await client.getInterventions()

      const displayInterventions = response.interventions.map(intervention => [
        { text: intervention.id },
        { text: intervention.name },
      ])

      res.render('pages/index', { interventions: displayInterventions })
    },
  }
}
