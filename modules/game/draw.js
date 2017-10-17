module.exports = function(game, n) {
  if (n === undefined) {
    n = 1
  }
  var drawnCards = []
  for (var i = 0; i < n; i++) {
    var card = game.library.pop()
    drawnCards.push(card.name)
    game.hand.push(card)
  }
  game.log('Draw ' + n, drawnCards)
}
