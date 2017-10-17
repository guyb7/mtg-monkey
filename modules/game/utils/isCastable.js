var getAvailableMana = require('./getAvailableMana')
var _ = require('../../../lib/lodash.min.js')

module.exports = function(game, card) {
  var availableMana = getAvailableMana(game)
  var re = /\{([\w\d]+)\}/g,
      manaCostMatch,
      manaCost = []
  while ((manaCostMatch = re.exec(card.manaCost)) !== null) {
    manaCost.push(manaCostMatch[1])
  }
  var castable = true
  _.each(manaCost, function(cost) {
    cost = cost.toLowerCase()
    if (!isNaN(Number(cost))) {
      var totalAvailableMana = _.reduce(availableMana, function(total, v, k) {
        return total + v
      }, 0)
      if (Number(cost) < totalAvailableMana) {
        castable = false
        return false
      }
    } else if (availableMana[cost] > 0) {
      availableMana[cost]--
    } else {
      castable = false
      return false
    }
  })
  return castable
}
