const KLD_Cards = require('../lib/KLD.json').cards
const AER_Cards = require('../lib/AER.json').cards
const AKH_Cards = require('../lib/AKH.json').cards
const HOU_Cards = require('../lib/HOU.json').cards
const XLN_Cards = require('../lib/XLN.json').cards

const _concat = require('lodash/concat')
      _clone = require('lodash/clone'),
      _find = require('lodash/find'),
      _each = require('lodash/each'),
      _omit = require('lodash/omit'),
      _times = require('lodash/times')

const cardsRepo = _concat(KLD_Cards, AER_Cards, AKH_Cards, HOU_Cards, XLN_Cards)

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
