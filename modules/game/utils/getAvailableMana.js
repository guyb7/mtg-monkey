var _ = require('../../../lib/lodash.min.js')

module.exports = function getAvailableMana(game) {
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
          break
        case 'Forest':
          availableMana.g++
          break
        case 'Island':
          availableMana.u++
          break
        case 'Swamp':
          availableMana.b++
          break
        case 'Plains':
          availableMana.w++
          break
        default:
          console.error('Unknown basic land', permanent)
      }
    }
  })
  return availableMana
}
