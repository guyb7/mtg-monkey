/*
  Sums the values of 2 arrays with the following structure:
  [
    { name: 'A', value: 1 },
    { name: 'B', value: 0 },
    { name: 'C', value: 2 }
  ]
*/

const _ = require('lodash')

module.exports = function(arr1, arr2) {
  const arr1Dict = _.reduce(arr1, (acc, i) => {
    acc[i.name] = i.value
    return acc
  }, {})
  const merged = _.map(_.clone(arr2), item => {
    return {
      name: item.name,
      value: item.value + arr1Dict[item.name]
    }
  })
  return merged
}
