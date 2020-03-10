const bunyan = require('bunyan')
const bunyanFormat = require('bunyan-format')

const formatOut = bunyanFormat({ outputMode: 'json', color: true })

const log = bunyan.createLogger({ name: 'Interventions Catalogue UI', stream: formatOut, level: 'debug' })

module.exports = log
