var getAvailableMana = require('./getAvailableMana')

var _each = require('lodash/each'),
    _reduce = require('lodash/reduce')

module.exports = function(game, card) {
  var availableMana = getAvailableMana(game)
  var re = /\{([\w\d]+)\}/g,
      manaCostMatch,
      manaCost = []
  while ((manaCostMatch = re.exec(card.manaCost)) !== null) {
    manaCost.push(manaCostMatch[1])
  }
  var castable = true
  _each(manaCost, function(cost) {
    cost = cost.toLowerCase()
    if (!isNaN(Number(cost))) {
      var totalAvailableMana = _reduce(availableMana, function(total, v, k) {
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
