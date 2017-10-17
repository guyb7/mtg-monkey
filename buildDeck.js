var cardsRepo = require('./XLN.json').cards
var _ = require('./lodash.min.js')

module.exports = function(deck) {
  var cards = []
  _.each(deck, function(deckCard) {
    var filter = _.omit(deckCard, ['count'])
    var card = _.find(cardsRepo, filter)
    if (card === undefined) {
      console.error('Card not found', filter)
      process.exit()
    }
    _.times(deckCard.count, function() {
      cards.push(_.clone(card))
    })
  })
  return cards
}
