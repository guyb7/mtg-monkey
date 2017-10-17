var _ = require('./lodash.min.js')
var buildDeck = require('./buildDeck.js')
var playGame = require('./playGame.js')

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
  }
]

function printCards(cards) {
  console.log(_.reduce(cards, function(cards, card) {
    cards.push(card.name)
    return cards
  }, []))
}

_.times(1, function(i) {
  var results =  playGame({
    deck: buildDeck(deck),
    bot: _.clone(bot),
    first: true,
    turns: 4
  })
  console.log('=== Results ===')
  console.log('Battlefield:')
  printCards(results.battlefield)
  console.log('Hand:')
  printCards(results.hand)
})
