const buildDeck = require('./modules/buildDeck')
const playGame = require('./modules/playGame')
const averageResults = require('./modules/results/averageResults')

const Promise = require('bluebird'),
      _clone = require('lodash/clone'),
      _times = require('lodash/times')

const deck = [
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

const bot = [
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

const run = async gameOptions => {
  const games = []
  _times(gameOptions.games, i => {
    games.push(i)
  })
  const worker = gameNumber => playGame(gameOptions)
  const gameQueue = Promise.map(games, worker, { concurrency: gameOptions.concurrency })
  gameQueue.then(results => {
    gameOptions.onSuccess(results)
  })
  .catch(e => {
    gameOptions.onError(e)
  })
}

run({
  deck: buildDeck(deck),
  bot: _clone(bot),
  first: true,
  games: 20,
  concurrency: 1,
  turns: 4,
  onError(e) {
    console.error(e)
    process.exit()
  },
  onSuccess(results) {
    averageResults(results)
  }
})
