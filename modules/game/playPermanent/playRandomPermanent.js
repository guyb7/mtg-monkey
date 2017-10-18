var isCastable = require('../utils/isCastable')

var _concat = require('lodash/concat'),
    _indexOf = require('lodash/indexOf'),
    _remove = require('lodash/remove'),
    _shuffle = require('lodash/shuffle')

module.exports = function(game) {
  var playablePermanents = _remove(game.hand, function(card) {
    if (!isCastable(game, card)) {
      return false
    }
    if (_indexOf(card.types, 'Creature') > -1) {
      return true
    } else if (_indexOf(card.types, 'Enchantment') > -1) {
      return true
    } else if (_indexOf(card.types, 'Artifact') > -1) {
      return true
    }
    return false
  })
  if (playablePermanents.length === 0) {
    game.log('No playable permanents to play')
    return
  }
  playablePermanents = _shuffle(playablePermanents)
  var randomPermanent = playablePermanents.pop()
  game.log('Play random permanent', randomPermanent.name)
  game.battlefield.push(randomPermanent)
  game.hand = _concat(game.hand, playablePermanents)
}
