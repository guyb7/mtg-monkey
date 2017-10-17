var isCastable = require('../utils/isCastable')
var _ = require('../../../lib/lodash.min.js')

module.exports = function(game) {
  var playablePermanents = _.remove(game.hand, function(card) {
    if (!isCastable(game, card)) {
      return false
    }
    if (_.indexOf(card.types, 'Creature') > -1) {
      return true
    } else if (_.indexOf(card.types, 'Enchantment') > -1) {
      return true
    } else if (_.indexOf(card.types, 'Artifact') > -1) {
      return true
    }
    return false
  })
  if (playablePermanents.length === 0) {
    game.log('No playable permanents to play')
    return
  }
  playablePermanents = _.shuffle(playablePermanents)
  var randomPermanent = playablePermanents.pop()
  game.log('Play random permanent', randomPermanent.name)
  game.battlefield.push(randomPermanent)
  game.hand = _.concat(game.hand, playablePermanents)
}
