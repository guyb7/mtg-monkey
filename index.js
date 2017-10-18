var buildDeck = require('./modules/buildDeck')
var playGame = require('./modules/playGame')

var _clone = require('lodash/clone'),
    _each = require('lodash/each'),
    _reduce = require('lodash/reduce'),
    _times = require('lodash/times')

var deck = [
  {
    name: 'Mountain',
    count: 12
  }, {
    name: 'Plains',
    count: 12
  }, {
    name: 'Sky Terror',
    count: 26
  }
]

var bot = [
  {
    type: 'play_land',
    strategy: 'random'
  }, {
    type: 'log_stats',
    metric: 'count_available_mana'
  }, {
    type: 'play_permanent',
    strategy: 'random'
  }
]

function printCards(cards) {
  console.log(_reduce(cards, function(cards, card) {
    cards.push(card.name)
    return cards
  }, []))
}

_times(1, function(i) {
  var results =  playGame({
    deck: buildDeck(deck),
    bot: _clone(bot),
    first: true,
    turns: 4
  })
  console.log("\n" + '=== Results ===')
  console.log('Battlefield:')
  printCards(results.battlefield)
  console.log('Hand:')
  printCards(results.hand)
  console.log("\n" + 'Game log:')
  _each(results.log, function(log) {
    if (log.payload) {
      console.log(log.message, log.payload)
    } else {
      console.log(log.message)
    }
  })
  console.log("\n" + 'Metrics:')
  _each(results.metrics, function(m) {
    console.log(m)
  })
})
