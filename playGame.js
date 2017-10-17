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

function playPermanent(game, strategy) {
  switch (strategy) {
    case 'random':
      playRandomPermanent(game)
      break;
    default:
      console.error('Unnknown playPermanent strategy', strategy)
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

function isCastable(game, card) {
  var availableMana = {
    r: 0,
    g: 0,
    u: 0,
    b: 0,
    w: 0,
    c: 0,
    a: 0
  }
  _.each(game.battlefield, function(permanent) {
    if (_.has(permanent, 'supertypes') && _.indexOf(permanent.supertypes, 'Basic') > -1 && _.indexOf(permanent.types, 'Land') > -1) {
      switch (permanent.name) {
        case 'Mountain':
          availableMana.r++
          break;
        case 'Forest':
          availableMana.g++
          break;
        case 'Island':
          availableMana.u++
          break;
        case 'Swamp':
          availableMana.b++
          break;
        case 'Plains':
          availableMana.w++
          break;
        default:
          console.error('Unknown basic land', permanent)
      }
    }
  })
  var re = /\{([\w\d]+)\}/g,
      manaCostMatch,
      manaCost = []
  while ((manaCostMatch = re.exec(card.manaCost)) !== null) {
    manaCost.push(manaCostMatch[1])
  }
  var castable = true
  _.each(manaCost, function(cost) {
    cost = cost.toLowerCase()
    if (!isNaN(Number(cost))) {
      var totalAvailableMana = _.reduce(availableMana, function(total, v, k) {
        return total + v
      }, 0)
      if (Number(cost) < totalAvailableMana) {
        castable = false
        return false
      }
    } else if (availableMana[cost] > 0) {
      availableMana[cost]--
    } else {
      castable = false
      return false
    }
  })
  return castable
}

function playRandomPermanent(game) {
  var playablePermanents = _.remove(game.hand, function(card) {
    if (!isCastable(game, card)) {
      return false
    }
    if (_.indexOf(card.types, 'Creature') > -1) {
      return true
    } else if (_.indexOf(card.types, 'Enchantment') > -1) {
      return true
    } else if (_.indexOf(card.types, 'Artifact') > -1) {
      return true
    }
    return false
  })
  if (playablePermanents.length === 0) {
    log(game, 'No playable permanents to play')
    return
  }
  playablePermanents = _.shuffle(playablePermanents)
  var randomPermanent = playablePermanents.pop()
  log(game, 'Play random permanent', randomPermanent.name)
  game.battlefield.push(randomPermanent)
  game.hand = _.concat(game.hand, playablePermanents)
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
    case 'play_permanent':
      playPermanent(game, command.strategy)
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
      var command = commands.shift()
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
