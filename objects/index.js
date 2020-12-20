const _ = require('lodash');
const R = require('ramda');

const { arrayData5 } = require('../arrays/arrayData');
const { objData100, objData1000, mergeOne, mergeTwo, objDataReduce } = require('./objectData');

const keys = {
  name: 'keys',
  checksum: [() => Object.keys(objData1000)],
  fn: [
    () => Object.keys(objData1000),
    () => _.keys(objData1000),
    () => R.keys(objData1000),
  ]
};

const merge = {
  name: 'merge (triple)',
  checksum: [
    () => _.merge(mergeOne, mergeTwo)
  ],
  fn: [
    () => null,
    () => _.merge(mergeOne, mergeTwo),
    () => R.merge(mergeOne, mergeTwo)
  ],
  noList: {
    noJS: true
  }
};

const omit = {
  name: 'omit',
  checksum: [
    () => {
      const { createdAt, authors, ...result } = mergeOne;
      return result;
    }
  ],
  fn: [
    () => {
      const { createdAt, authors, ...result } = mergeOne;
      return result;
    },
    () => _.omit(mergeOne, ['createdAt', 'authors']),
    () => R.omit(['createdAt', 'authors'], mergeOne),
  ]
};

const pathShort = {
  name: 'path (short)',
  checksum: [() => objDataReduce?.children[0]?.children[0]?.index],
  fn: [
    () => objDataReduce?.children[0]?.children[0]?.index,
    () => _.get(objDataReduce, ['children', '0', 'children', '0', 'index']),
    () => R.path(['children', '0', 'children', '0', 'index'], objDataReduce),
  ]
};

const pathLong = {
  name: 'path (long)',
  checksum: [
    () => objDataReduce?.children[0]?.children[0]?.children[0]?.children[0]?.children[0]?.index
  ],
  fn: [
    () => objDataReduce?.children[0]?.children[0]?.children[0]?.children[0]?.children[0]?.index,
    () => _.get(objDataReduce, ['children', '0', 'children', '0', 'children', '0', 'children', '0', 'children', '0', 'index']),
    () => R.path(['children', '0', 'children', '0', 'children', '0', 'children', '0', 'children', '0', 'index'], objDataReduce),
  ]
};

const pick = {
  name: 'pick',
  checksum: [
    () => (function pick(object, keys) {
      return keys.reduce((obj, key) => {
        if (object && object.hasOwnProperty(key)) { obj[key] = object[key]; }
        return obj;
      }, {});
    })(objData1000, ['createdAt', 'authors'])
  ],
  fn: [
    () => (function pick(object, keys) {
      return keys.reduce((obj, key) => {
        if (object && object.hasOwnProperty(key)) { obj[key] = object[key]; }
        return obj;
      }, {});
    })(objData1000, ['createdAt', 'authors']),
    () => _.pick(objData1000, ['createdAt', 'authors']),
    () => R.pick(['createdAt', 'authors'], objData1000),
  ]
};

const toPairs = {
  name: 'toPairs',
  checksum: [() => Object.entries(objData100)],
  fn: [
    () => Object.entries(objData100),
    () => _.toPairs(objData100),
    () => R.toPairs(objData100),
  ]
};

const values = {
  name: 'values',
  checksum: [() => Object.values(objData100)],
  fn: [
    () => Object.values(objData100),
    () => _.values(objData100),
    () => R.values(objData100),
  ]
};

const zipObj = {
  name: 'zipObj',
  checksum: [
    () => _.zipObject(
      (_.zipObject(arrayData5[0], arrayData5[1])),
      (_.zipObject(arrayData5[0], arrayData5[1]))
    )
  ],
  fn: [
    () => null,
    () => _.zipObject(
      (_.zipObject(arrayData5[0], arrayData5[1])),
      (_.zipObject(arrayData5[0], arrayData5[1]))
    ),
    () => R.zipObj(
      (R.zipObj(arrayData5[0], arrayData5[1])),
      (R.zipObj(arrayData5[0], arrayData5[1]))
    )
  ],
  noList: {
    noJS: true
  }
};


module.exports = {
  keys,
  merge,
  omit,
  pathShort,
  pathLong,
  pick,
  toPairs,
  values,
  zipObj
};
