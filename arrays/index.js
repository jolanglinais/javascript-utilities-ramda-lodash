const _ = require('lodash');
const R = require('ramda');

const { arrayData5, arrayData10, arrayData100, arrayDataReduce } = require('./arrayData');

const concat = {
  name: 'concat',
  checksum: [() => arrayData100.concat(2, [3], [[4]])],
  fn: [
    () => arrayData100.concat(2, [3], [[4]]),
    () => _.concat(arrayData100, 2, [3], [[4]]),
    () => R.concat(arrayData100, [2, 3, [4]])
  ]
};

const each = {
  name: 'each',
  checksum: [
    () => _.forEach(arrayData100, val => !!val),
    true
  ],
  fn: [
    () => arrayData100.forEach(val => !!val),
    () => _.forEach(arrayData100, val => !!val),
    () => R.forEach(val => !!val, arrayData100)
  ]
};

const filter = {
  name: 'filter',
  checksum: [() => arrayData100.filter(val => Array.isArray(val))],
  fn: [
    () => arrayData100.filter(val => Array.isArray(val)),
    () => _.filter(arrayData100, val => Array.isArray(val)),
    () => R.filter(val => Array.isArray(val), arrayData100)
  ]
};

const find = {
  name: 'find',
  checksum: [() => arrayData100.find(val => Number.isInteger(val) && val % 2)],
  fn: [
    () => arrayData100.find(val => Number.isInteger(val) && val % 2),
    () => _.find(arrayData100, val => Number.isInteger(val) && val % 2),
    () => R.find(val => Number.isInteger(val) && val % 2, arrayData100)
  ]
};

const findIndex = {
  name: 'findIndex',
  checksum: [() => arrayData100.findIndex(val => Number.isInteger(val) && val % 2)],
  fn: [
    () => arrayData100.findIndex(val => Number.isInteger(val) && val % 2),
    () => _.findIndex(arrayData100, val => Number.isInteger(val) && val % 2),
    () => R.findIndex(val => Number.isInteger(val) && val % 2, arrayData100)
  ]
};

const flatten = {
  name: 'flatten (deep)',
  checksum: [() => arrayData100.flat(Infinity)],
  fn: [
    () => arrayData100.flat(Infinity),
    () => _.flattenDeep(arrayData100),
    () => R.flatten(arrayData100)
  ]
};

const fromPairs = {
  name: 'fromPairs',
  checksum: [() => Object.fromEntries(arrayData100)],
  fn: [
    () => Object.fromEntries(arrayData100),
    () => _.fromPairs(arrayData100),
    () => R.fromPairs(arrayData100)
  ]
};

const fromPairsReduce = {
  name: 'fromPairs (reduce)',
  checksum: [() => arrayData100.reduce((acc, val) => (acc[val[0]] = val[1], acc), {})],
  fn: [
    () => arrayData100.reduce((acc, val) => (acc[val[0]] = val[1], acc), {}),
    () => _.fromPairs(arrayData100),
    () => R.fromPairs(arrayData100)
  ]
};

const head = {
  name: 'head',
  checksum: [() => arrayData100[0]],
  fn: [
    () => arrayData100[0],
    () => _.head(arrayData100),
    () => R.head(arrayData100)
  ]
};

const map = {
  name: 'map',
  checksum: [() => arrayData100.map(val => Number.isInteger(val) && val * 2)],
  fn: [
    () => arrayData100.map(val => Number.isInteger(val) && val * 2),
    () => _.map(arrayData100, val => Number.isInteger(val) && val * 2),
    () => R.map(val => Number.isInteger(val) && val * 2, arrayData100)
  ]
};

const range = {
  name: 'range',
  checksum: [() => Array.from({ length: 1000 }, (_, i) => i)],
  fn: [
    () => Array.from({ length: 1000 }, (_, i) => i),
    () => _.range(0, 1000),
    () => R.range(0, 1000)
  ]
};

const reduce = {
  name: 'reduce',
  checksum: [() => arrayDataReduce.reduce((prev, curr, i, arr) => prev + curr)],
  fn: [
    () => arrayDataReduce.reduce((prev, curr, i, arr) => prev + curr),
    () => _.reduce(arrayDataReduce, (prev, curr, i, arr) => prev + curr),
    () => R.reduce((prev, curr, i, arr) => prev + curr, 0, arrayDataReduce)
  ]
};

const reject = {
  name: 'reject',
  checksum: [() => arrayData100.filter(val => !Number.isInteger(val) && val % 2 !== 0)],
  fn: [
    () => arrayData100.filter(val => !Number.isInteger(val) && val % 2 !== 0),
    () => _.reject(arrayData100, val => Number.isInteger(val) && val % 2 === 0),
    () => R.reject(val => Number.isInteger(val) && val % 2 === 0, arrayData100)
  ]
};

const tail = {
  name: 'tail',
  checksum: [() => arrayData10.slice(1)],
  fn: [
    () => arrayData10.slice(1),
    () => _.tail(arrayData10),
    () => R.tail(arrayData10)
  ]
};

const uniq = {
  name: 'uniq',
  checksum: [() => [...new Set([1, 2, 1, 4, 5, 5, 4, 2, 1, 5, 6, 4, 3, 9, 54, 3, 54, 3, 55, 2, 3, 4, 12])]],
  fn: [
    () => [...new Set([1, 2, 1, 4, 5, 5, 4, 2, 1, 5, 6, 4, 3, 9, 54, 3, 54, 3, 55, 2, 3, 4, 12])],
    () => _.uniq([1, 2, 1, 4, 5, 5, 4, 2, 1, 5, 6, 4, 3, 9, 54, 3, 54, 3, 55, 2, 3, 4, 12]),
    () => R.uniq([1, 2, 1, 4, 5, 5, 4, 2, 1, 5, 6, 4, 3, 9, 54, 3, 54, 3, 55, 2, 3, 4, 12])
  ]
};

const zip = {
  name: 'zip',
  checksum: [
    () => _.zip((_.zip(arrayData5[0], arrayData5[1])), (_.zip(arrayData5[0], arrayData5[1])))
  ],
  fn: [
    () => null,
    () => _.zip((_.zip(arrayData5[0], arrayData5[1])), (_.zip(arrayData5[0], arrayData5[1]))),
    () => R.zip((R.zip(arrayData5[0], arrayData5[1])), (R.zip(arrayData5[0], arrayData5[1])))
  ],
  noList: {
    noJS: true
  }
};

module.exports = {
  concat,
  each,
  filter,
  find,
  findIndex,
  flatten,
  fromPairs,
  fromPairsReduce,
  head,
  map,
  range,
  reduce,
  reject,
  tail,
  uniq,
  zip
};
