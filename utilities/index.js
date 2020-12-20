const _ = require('lodash');
const R = require('ramda');

const { arrayData100, arrayData100no2 } = require('../arrays/arrayData');
const { objData5 } = require('../objects/objectData');

const clone = {
  name: 'clone',
  checksum: [() => objData5.map(obj => ({ ...obj }))],
  fn: [
    () => objData5.map(obj => ({ ...obj })),
    () => _.clone(objData5),
    () => R.clone(objData5),
  ]
};

const debounce = {
  name: 'debounce',
  checksum: [() => true, true],
  fn: [
    () => null,
    () => _.debounce(() => console.log(''), 1),
    () => null,
  ],
  noList: {
    noJS: true,
    noRA: true,
  }
};

const isEmpty = {
  name: 'isEmpty',
  checksum: [
    () => [Object, Array].includes((objData5 || {}).constructor)
      && !Object.entries((objData5 || {})).length
  ],
  fn: [
    () => [Object, Array].includes((objData5 || {}).constructor)
      && !Object.entries((objData5 || {})).length,
    () => _.isEmpty(objData5),
    () => R.isEmpty(objData5),
  ]
};

const isEqual = {
  name: 'isEqual',
  checksum: [() => _.isEqual(arrayData100, arrayData100no2)],
  fn: [
    () => null,
    () => _.isEqual(arrayData100, arrayData100no2),
    () => R.equals(arrayData100, arrayData100no2),
  ],
  noList: {
    noJS: true,
  }
};

const isFunction = {
  name: 'isFunction',
  checksum: [() => ((typeof (x => x + 3)) === "function")],
  fn: [
    () => ((typeof (x => x + 3)) === "function"),
    () => _.isFunction(x => x + 3),
    () => null,
  ],
  noList: {
    noRA: true,
  }
};

const isNil = {
  name: 'isNil',
  checksum: [() => _.isNil(false)],
  fn: [
    () => false == null,
    () => _.isNil(false),
    () => R.isNil(false),
  ]
};

const type = {
  name: 'type',
  checksum: [() => typeof '', true],
  fn: [
    () => typeof '',
    () => null,
    () => R.type(''),
  ],
  noList: {
    noLO: true,
  }
};


module.exports = {
  clone,
  debounce,
  isEmpty,
  isEqual,
  isFunction,
  isNil,
  type
}