const buildDeck = require('./modules/buildDeck')
const playGame = require('./modules/playGame')
const averageResults = require('./modules/results/averageResults')

const Promise = require('bluebird'),
      _clone = require('lodash/clone'),
      _times = require('lodash/times')

const deck = [
  {
    name: 'Mountain',
    count: 1
  }, {
    name: 'Swamp',
    count: 12
  }, {
    name: 'Aether Hub',
    count: 4
  }, {
    name: 'Canyon Slough',
    count: 2
  }, {
    name: 'Dragonskull Summit',
    count: 4
  }, {
    name: 'Dread Wanderer',
    count: 4
  }, {
    name: 'Night Market Lookout',
    count: 4
  }, {
    name: 'Vicious Conquistador',
    count: 4
  }, {
    name: 'Glint-Sleeve Siphoner',
    count: 4
  }, {
    name: 'Scrapheap Scrounger',
    count: 4
  }, {
    name: 'Yahenni, Undying Partisan',
    count: 3
  }, {
    name: 'Fatal Push',
    count: 4
  }, {
    name: 'Lightning Strike',
    count: 4
  }, {
    name: "Bontu's Last Reckoning",
    count: 1
  }, {
    name: 'Aethersphere Harvester',
    count: 2
  }
]

const bot = [
  {
    type: 'play_land',
    strategy: 'diverse'
  }, {
    type: 'play_permanent',
    strategy: 'random'
  }, {
    type: 'log_stats',
    metric: 'count_permanents'
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
  games: 200,
  concurrency: 1,
  turns: 4,
  onError(e) {
    console.error(e)
    process.exit()
  },
  onSuccess(results) {
    const averages = averageResults(results)
    console.log(JSON.stringify(averages, null, 2 ))
    console.log(JSON.stringify(results[0].log, null, 2 )) // First game log
  }
})
