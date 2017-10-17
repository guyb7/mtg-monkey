var _ = require('./lodash.min.js')
var playGame = require('./playGame.js')
var cardsRepo = require('./XLN.json').cards

var deck = []
var bot = [
  {
    type: 'play_land',
    strategy: 'random'
  }
]

var mountain = _.find(cardsRepo, { 'multiverseid': 435433 })
var plains = _.find(cardsRepo, { 'multiverseid': 435421 })
var skyTerror = _.find(cardsRepo, { 'multiverseid': 435385 })

for (var i = 0; i < 12; i++) {
  deck.push(Object.assign({}, plains))
}
for (var i = 0; i < 12; i++) {
  deck.push(Object.assign({}, mountain))
}
for (var i = 0; i < 26; i++) {
  deck.push(Object.assign({}, skyTerror))
}

function printCards(cards) {
  console.log(_.reduce(cards, function(cards, card) {
    cards.push(card.name)
    return cards
  }, []))
}

_.times(1, function(i) {
  var results =  playGame({
    deck: _.clone(deck),
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
