var cardsRepo = require('../lib/XLN.json').cards

var _clone = require('lodash/clone'),
    _find = require('lodash/find'),
    _each = require('lodash/each'),
    _omit = require('lodash/omit'),
    _times = require('lodash/times')

module.exports = function(deck) {
  var cards = []
  _each(deck, function(deckCard) {
    var filter = _omit(deckCard, ['count'])
    var card = _find(cardsRepo, filter)
    if (card === undefined) {
      console.error('Card not found', filter)
      process.exit()
    }
    _times(deckCard.count, function() {
      cards.push(_clone(card))
    })
  })
  return cards
}
