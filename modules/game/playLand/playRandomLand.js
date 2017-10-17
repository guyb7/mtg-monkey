var _ = require('../../../lib/lodash.min.js')

module.exports = function(game) {
  var lands = _.remove(game.hand, function(card) {
    return _.indexOf(card.types, 'Land') > -1
  })
  if (lands.length === 0) {
    game.log('No lands to play')
    return
  }
  lands = _.shuffle(lands)
  var randomLand = lands.pop()
  game.log('Play random land', randomLand.name)
  game.battlefield.push(randomLand)
  game.hand = _.concat(game.hand, lands)
}
