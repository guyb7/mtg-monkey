var countAvailableMana = require('./countAvailableMana')

module.exports = function(game, metric) {
  switch (metric) {
    case 'count_available_mana':
      countAvailableMana(game)
      break
    default:
      console.error('Unnknown log metric', metric)
      process.exit()
  }
}
