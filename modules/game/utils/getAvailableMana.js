var _each = require('lodash/each'),
    _has = require('lodash/has'),
    _indexOf = require('lodash/indexOf')

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
  _each(game.battlefield, function(permanent) {
    if (_has(permanent, 'supertypes') && _indexOf(permanent.supertypes, 'Basic') > -1 && _indexOf(permanent.types, 'Land') > -1) {
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
