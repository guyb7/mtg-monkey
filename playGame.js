var _ = require('./lodash.min.js')

function log(game, message, payload) {
  game.log.push({
    message: message,
    payload: payload
  })
}

function initGame(deck) {
  var game = {
    turn: 1,
    battlefield: [],
    library: _.shuffle(deck),
    hand: [],
    graveyard: [],
    log: []
  }
  log(game, 'Shuffle')
  draw(game, 7)
  return game
}

function draw(game, n) {
  if (n === undefined) {
    n = 1
  }
  var drawnCards = []
  _.times(n, function() {
    var card = game.library.pop()
    drawnCards.push(card.name)
    game.hand.push(card)
  })
  log(game, 'Draw ' + n, drawnCards)
}

function playLand(game, strategy) {
  switch (strategy) {
    case 'random':
      playRandomLand(game)
      break;
    default:
      console.error('Unnknown playLand strategy', strategy)
      process.exit()
  }
}

function playRandomLand(game) {
  var lands = _.remove(game.hand, function(card) {
    return _.indexOf(card.types, 'Land') > -1
  })
  if (lands.length === 0) {
    log(game, 'No lands to play')
    return
  }
  lands = _.shuffle(lands)
  var randomLand = lands.pop()
  log(game, 'Play random land', randomLand.name)
  game.battlefield.push(randomLand)
  game.hand = _.concat(game.hand, lands)
}

function checkToDiscard(game) {
  if (game.hand.length > 7) {
    discard(game, game.hand.length - 7)
  }
}

function discard(game, n) {
  game.hand = _.shuffle(game.hand)
  var discards = []
  _.times(n, function() {
    discards.push(game.hand.pop())
  })
  log(game, 'Discarding at random', discards.map(function(c) {
    return c.name
  }))
}

function runCommand(game, command, results) {
  switch (command.type) {
    case 'draw':
      draw(game)
      break;
    case 'play_land':
      playLand(game, command.strategy)
      break;
    default:
      console.error('Unnknown command', command)
      process.exit()
  }
}

module.exports = function(options) {
  var game = initGame(options.deck)
  var results = {}
  _.times(options.turns, function(turn) {
    log(game, 'New turn', turn + 1)
    if (options.first && turn === 0) {
      log(game, 'Skip draw step', turn + 1)
    } else {
      draw(game)
    }
    var commands = _.clone(options.bot)
    while (commands.length > 0) {
      var command = commands.pop()
      runCommand(game, command, results)
    }
    checkToDiscard(game)
  })
  return {
    library: game.library.length,
    hand: game.hand,
    battlefield: game.battlefield,
    log: game.log
  }
}
