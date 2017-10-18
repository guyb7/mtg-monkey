var _concat = require('lodash/concat'),
    _indexOf = require('lodash/indexOf'),
    _remove = require('lodash/remove'),
    _shuffle = require('lodash/shuffle')

module.exports = function(game) {
  var lands = _remove(game.hand, function(card) {
    return _indexOf(card.types, 'Land') > -1
  })
  if (lands.length === 0) {
    game.log('No lands to play')
    return
  }
  lands = _shuffle(lands)
  var randomLand = lands.pop()
  game.log('Play random land', randomLand.name)
  game.battlefield.push(randomLand)
  game.hand = _concat(game.hand, lands)
}
