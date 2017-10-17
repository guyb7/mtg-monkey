var playRandomPermanent = require('./playRandomPermanent')

module.exports = function(game, strategy) {
  switch (strategy) {
    case 'random':
      playRandomPermanent(game)
      break
    default:
      console.error('Unnknown playPermanent strategy', strategy)
      process.exit()
  }
}
