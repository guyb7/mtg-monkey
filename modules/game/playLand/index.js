const playRandomLand = require('./playRandomLand')
const playDiverseLand = require('./playDiverseLand')

module.exports = function(game, strategy) {
  switch (strategy) {
    case 'random':
      playRandomLand(game)
      break
    case 'diverse':
      playDiverseLand(game)
      break
    default:
      console.error('Unnknown playLand strategy', strategy)
      process.exit()
  }
}
