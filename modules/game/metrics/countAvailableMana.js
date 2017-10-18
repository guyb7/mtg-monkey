var getAvailableMana = require('../utils/getAvailableMana')
var _map = require('lodash/map')

module.exports = function(game) {
  if (!game.metrics.availableMana) {
    game.metrics.availableMana = []
  }
  game.metrics.availableMana[game.turn - 1] = _map(getAvailableMana(game), function(v, k) {
    return {
      name: k.toUpperCase(),
      value: v
    }
  })
}
