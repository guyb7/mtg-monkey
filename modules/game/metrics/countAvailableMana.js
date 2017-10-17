var getAvailableMana = require('../utils/getAvailableMana')
var _ = require('../../../lib/lodash.min.js')

module.exports = function(game) {
  if (!game.metrics.availableMana) {
    game.metrics.availableMana = []
  }
  game.metrics.availableMana[game.turn - 1] = _.map(getAvailableMana(game), function(v, k) {
    return {
      name: k.toUpperCase(),
      value: v
    }
  })
}
