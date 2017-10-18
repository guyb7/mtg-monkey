var draw = require('./game/draw')
var discard = require('./game/discard')
var addStats = require('./game/metrics/addStats')
var playLand = require('./game/playLand/')
var playPermanent = require('./game/playPermanent/')

var _clone = require('lodash/clone'),
    _shuffle = require('lodash/shuffle'),
    _times = require('lodash/times')

function initGame(deck) {
  var game = {
    turn: 1,
    battlefield: [],
    library: _shuffle(deck),
    hand: [],
    graveyard: [],
    logs: [],
    log: function(message, payload) {
      game.logs.push({
        message: message,
        payload: payload
      })
    },
    metrics: {}
  }
  game.log('Shuffle')
  draw(game, 7)
  return game
}

function checkToDiscard(game) {
  if (game.hand.length > 7) {
    discard(game, game.hand.length - 7)
  }
}

function runCommand(game, command, results) {
  switch (command.type) {
    case 'draw':
      draw(game)
      break
    case 'play_land':
      playLand(game, command.strategy)
      break
    case 'play_permanent':
      playPermanent(game, command.strategy)
      break
    case 'log_stats':
      addStats(game, command.metric)
      break
    default:
      console.error('Unnknown command', command)
      process.exit()
  }
}

module.exports = function(options) {
  var game = initGame(options.deck)
  var results = {}
  _times(options.turns, function(turn) {
    game.turn = turn + 1
    game.log('Turn', game.turn)
    if (options.first && turn === 0) {
      game.log('Skip draw step', game.turn)
    } else {
      draw(game)
    }
    var commands = _clone(options.bot)
    while (commands.length > 0) {
      var command = commands.shift()
      runCommand(game, command, results)
    }
    checkToDiscard(game)
  })
  return {
    library: game.library.length,
    hand: game.hand,
    battlefield: game.battlefield,
    log: game.logs,
    metrics: game.metrics
  }
}
