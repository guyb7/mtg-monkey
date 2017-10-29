var countAvailableMana = require('./countAvailableMana')
var countPermanents = require('./countPermanents')

module.exports = function(game, metric) {
  switch (metric) {
    case 'count_available_mana':
      countAvailableMana(game)
      break
    case 'count_permanents':
      countPermanents(game)
      break
    default:
      console.error('Unnknown log metric', metric)
      process.exit()
  }
}
