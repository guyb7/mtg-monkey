const mergeArraysSum = require('./mergeArraysSum')

// var _reduce = require('lodash/each')
const _ = require('lodash')

module.exports = function(results) {
  const averages = {}
  _.each(results, r => {
    _.each(r.metrics, (rounds, metric) => {
      if (!averages[metric]) {
        averages[metric] = []
      }
      _.each(rounds, (data, round) => {
        if (!averages[metric][round]) {
          averages[metric][round] = {
            count: 1,
            sum: data
          }
        } else {
          averages[metric][round].count++
          if (_.isNumber(data)) {
            averages[metric][round].sum += data
          } else if (_.isArray(data)) {
            averages[metric][round].sum = mergeArraysSum(data, averages[metric][round].sum)
          }
        }
      })
    })
  })
  _.each(averages, (turns, metric) => {
    averages[metric] = _.map(turns, turn => {
      return _.map(turn.sum, i => {
        return {
          name: i.name,
          value: i.value / turn.count
        }
      })
    })
  })
  return averages
}
