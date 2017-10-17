var playRandomLand = require('./playRandomLand')

module.exports = function(game, strategy) {
  switch (strategy) {
    case 'random':
      playRandomLand(game)
      break
    default:
      console.error('Unnknown playLand strategy', strategy)
      process.exit()
  }
}
