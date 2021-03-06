var _shuffle = require('lodash/shuffle')

module.exports = function(game, n) {
  game.hand = _shuffle(game.hand)
  var discards = []
  for (var i = 0; i < n; i++) {
    discards.push(game.hand.pop())
  }
  game.log('Discarding at random', discards.map(function(c) {
    return c.name
  }))
}
