const _each = require('lodash/each'),
      _filter = require('lodash/filter'),
      _indexOf = require('lodash/indexOf'),
      _map = require('lodash/map'),
      _sortBy = require('lodash/sortBy')

module.exports = function(game) {
  if (!game.metrics.nonlandPermanentsOnBattlefield) {
    game.metrics.nonlandPermanentsOnBattlefield = []
  }
  const permanents = {
    lands: 0,
    creatures: 0,
    enchantments: 0
  }
  _each(game.battlefield, p => {
    if (_indexOf(p.types, 'Land') > -1) {
      permanents.lands++
    }
    if (_indexOf(p.types, 'Creature') > -1) {
      permanents.creatures++
    }
    if (_indexOf(p.types, 'Enchantment') > -1) {
      permanents.enchantments++
    }
  })
  game.metrics.nonlandPermanentsOnBattlefield[game.turn - 1] = _sortBy(_map(permanents, (v, k) => {
    return {
      name: k.toUpperCase(),
      value: v
    }
  }), ['name'])
}
