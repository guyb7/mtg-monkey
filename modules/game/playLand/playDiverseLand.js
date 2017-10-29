const getAvailableMana = require('../utils/getAvailableMana')
const _concat = require('lodash/concat'),
      _indexOf = require('lodash/indexOf'),
      _remove = require('lodash/remove'),
      _shuffle = require('lodash/shuffle'),
      _orderBy = require('lodash/orderBy'),
      _each = require('lodash/each'),
      _map = require('lodash/map'),
      _find = require('lodash/find'),
      _toPairs = require('lodash/toPairs')

module.exports = function(game) {
  let lands = _remove(game.hand, function(card) {
    return _indexOf(card.types, 'Land') > -1
  })
  if (lands.length === 0) {
    game.log('No lands to play')
    return
  }

  const availableMana = getAvailableMana(game)
  lands = _orderBy(lands, [l => {
    return availableMana[l.colorIdentity[0].toLowerCase()]
  }])

  const firstLand = lands.shift()
  game.log('Play diverse land', firstLand.name)
  game.battlefield.push(firstLand)
  game.hand = _concat(game.hand, lands)
}
