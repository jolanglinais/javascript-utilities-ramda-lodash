const { v4: uuidv4 } = require('uuid');
const _ = require('lodash');
const fp = require('lodash/fp');
const R = require('ramda');

const {
  arrayData100, arrayData100no2, arrayData1000, arrayDataReduce
} = require('../arrays/arrayData');
const { objData100, objData1000, mergeOne, objDataReduce } = require('../objects/objectData');
const { stringDate, largeText } = require('../strings/stringData');

const pipingData = _.range(100000).map((i) => ({ counter: i, more: { counterTwo: i * 2 } }));
const isOdd = (num) => num % 2 === 1;
const square = (num) => num * num;
const lessThanThreeDigits = (num) => num.toString().length < 3;

const curryingObjects = _.range(10000)
  .map((i) => ({ name: uuidv4(), since: Math.floor(1000 + Math.random() * 9000) }));

const CURRIED_PIPING_NUMBERS = {
  name: 'Curried / Piping Numbers',
  checksum: [() => true, true],
  fn: [
    () => {
      pipingData.map(x => x.counter)
        .filter(isOdd)
        .map(square)
        .filter(lessThanThreeDigits);
    },
    () => {
      _.chain(pipingData)
        .pick('counter')
        .filter(isOdd)
        .map(square)
        .filter(lessThanThreeDigits)
        .value();
    },
    () => {
      R.pipe(
        R.pluck('counter'),
        R.filter(isOdd),
        R.map(square),
        R.filter(lessThanThreeDigits),
      )(pipingData);
    },
  ]
};

const CURRIED_PIPING_OBJECTS = {
  name: 'Curried / Piping Objects',
  checksum: [() => true, true],
  fn: [
    () => {
      curryingObjects.filter((c) => c.name.split("-").map(val => val.includes('0')))
        .map((c) => ({ name: c.name.toUpperCase(), since: c.since }))
        .map(square)
        .filter(lessThanThreeDigits)
        .concat()
        .sort(() => (a, b) => (a['since'] > b['since'])
          ? 1
          : ((b['since'] > a['since']) ? -1 : 0));
    },
    () => {
      _(curryingObjects).chain()
        .filter((c) => c.name.split("-").map(val => _.includes(val, '0')))
        .map((c) => ({ name: c.name.toUpperCase(), since: c.since }))
        .sortBy((c) => c.since)
        .reverse()
        .value();
    },
    () => {
      R.compose(
        R.reverse,
        R.sortBy(R.prop("since")),
        R.map(R.over(R.lensProp("name"), R.toUpper)),
        R.filter(R.where({ name: R.test(/^0/) }))
      )(curryingObjects);
    },
  ]
};

const CURRIED_PIPING_FUNCTIONAL = {
  name: 'Curried / Piping FP',
  checksum: [() => true, true],
  fn: [
    () => null,
    () => {
      _.flow(
        fp.filter(o => o.name.startsWith('tw')),
        fp.map(o => ({ ...o, name: o.name.toUpperCase() })),
        fp.sortBy('since')
      )(curryingObjects);
    },
    () => {
      R.pipe(
        R.filter(R.where({ name: R.startsWith('tw') })),
        R.map(R.evolve({ name: R.toUpper })),
        R.sort(R.descend(R.prop('since')))
      )(curryingObjects);
    },
  ],
  noList: {
    noJS: true,
  }
};

const COMMON_METHODS = {
  name: 'Common Methods',
  checksum: [() => true, true],
  fn: [
    () => {
      let js
      // ARRAY
      js = arrayData1000.concat(2, [3], [[4]]);
      js = arrayData1000.filter(val => Array.isArray(val));
      js = arrayData1000.find(val => Number.isInteger(val) && val % 2);
      js = arrayData1000.findIndex(val => Number.isInteger(val) && val % 2);
      js = arrayData1000.flat(Infinity);
      js = Object.fromEntries(arrayData100);
      js = arrayData100.reduce((acc, val) => (acc[val[0]] = val[1], acc), {});
      js = arrayData1000[0];
      js = arrayData1000.map(val => Number.isInteger(val) && val * 2);
      js = Array.from({ length: 1000 }, (_, i) => i);
      js = arrayDataReduce.reduce((prev, curr, i, arr) => prev + curr);
      js = arrayData1000.filter(val => !Number.isInteger(val) && val % 2 !== 0);
      js = arrayData1000.slice(1);
      js = [...new Set(arrayData1000.flat(Infinity))];

      // OBJECT
      js = Object.keys(objData1000);
      const { createdAt, authors, ...result } = mergeOne;
      js = objDataReduce?.children[0]?.children[0]?.index;
      js = objDataReduce?.children[0]?.children[0]?.children[0]?.children[0]?.children[0]?.index;
      js = (function pick(object, keys) {
        return keys.reduce((obj, key) => {
          if (object && object.hasOwnProperty(key)) { obj[key] = object[key]; }
          return obj;
        }, {});
      })(objData1000, ['createdAt', 'authors']);
      js = Object.entries(objData1000);
      js = Object.values(objData1000);

      // STRING
      js = JSON.stringify(arrayData100);
      js = JSON.stringify(mergeOne);
      js = JSON.stringify(stringDate);
      js = largeText.repeat(2).split(' ');
      js = largeText.repeat(2).toLowerCase();
      js = largeText.repeat(2).toUpperCase();

      // UTILITY
      js = objData100.map(obj => ({ ...obj }));
      js = [Object, Array].includes((objData100 || {}).constructor)
        && !Object.entries((objData100 || {})).length;
      js = typeof '';
    },
    () => {
      let lo;
      // ARRAY
      lo = _.concat(arrayData1000, 2, [3], [[4]]);
      lo = _.filter(arrayData1000, val => Array.isArray(val));
      lo = _.find(arrayData1000, val => Number.isInteger(val) && val % 2);
      lo = _.findIndex(arrayData1000, val => Number.isInteger(val) && val % 2);
      lo = _.flattenDeep(arrayData1000);
      lo = _.fromPairs(arrayData100);
      lo = _.fromPairs(arrayData100);
      lo = _.head(arrayData1000);
      lo = _.map(arrayData1000, val => Number.isInteger(val) && val * 2);
      lo = _.range(0, 1000);
      lo = _.reduce(arrayDataReduce, (prev, curr, i, arr) => prev + curr);
      lo = _.reject(arrayData1000, val => Number.isInteger(val) && val % 2 === 0);
      lo = _.tail(arrayData1000);
      lo = _.uniq(_.flattenDeep(arrayData1000));

      // OBJECT
      lo = _.keys(objData1000);
      lo = _.omit(mergeOne, ['createdAt', 'authors']);
      lo = _.get(objDataReduce, ['children', '0', 'children', '0', 'index']);
      lo = _.get(objDataReduce, ['children', '0', 'children', '0', 'children', '0', 'children', '0', 'children', '0', 'index']);
      lo = _.pick(objData1000, ['createdAt', 'authors']);
      lo = _.toPairs(objData1000);
      lo = _.values(objData1000);

      // STRING
      lo = _.toString(arrayData100);
      lo = _.toString(mergeOne);
      lo = _.toString(stringDate);
      lo = _.split(largeText.repeat(2), ' ');
      lo = _.toLower(largeText.repeat(2));
      lo = _.toUpper(largeText.repeat(2));

      // UTILITY
      lo = _.clone(objData100);
      lo = _.isEmpty(objData100);
      lo = _.isEqual(arrayData100, arrayData100no2);
      lo = _.isNil(false);
    },
    () => {
      let ra;
      // ARRAY
      // PAUSED HERE
      ra = R.concat(arrayData1000, [2, 3, [4]]);
      ra = R.filter(val => Array.isArray(val), arrayData1000);
      ra = R.find(val => Number.isInteger(val) && val % 2, arrayData1000);
      ra = R.findIndex(val => Number.isInteger(val) && val % 2, arrayData1000);
      ra = R.flatten(arrayData1000);
      ra = R.fromPairs(arrayData100);
      ra = R.fromPairs(arrayData100);
      ra = R.head(arrayData1000);
      ra = R.map(val => Number.isInteger(val) && val * 2, arrayData1000);
      ra = R.range(0, 1000);
      ra = R.reduce((prev, curr, i, arr) => prev + curr, 0, arrayDataReduce);
      ra = R.reject(val => Number.isInteger(val) && val % 2 === 0, arrayData100);
      ra = R.tail(arrayData1000);
      ra = R.uniq(_.flattenDeep(arrayData1000));

      // OBJECT
      ra = R.keys(objData1000);
      ra = R.omit(['createdAt', 'authors'], mergeOne);
      ra = R.path(['children', '0', 'children', '0', 'index'], objDataReduce);
      ra = R.path(['children', '0', 'children', '0', 'children', '0', 'children', '0', 'children', '0', 'index'], objDataReduce);
      ra = R.pick(['createdAt', 'authors'], objData1000);
      ra = R.toPairs(objData1000);
      ra = R.values(objData1000);

      // STRING
      ra = R.toString(arrayData100);
      ra = R.toString(mergeOne);
      ra = R.toString(stringDate);
      ra = R.split(' ', largeText.repeat(2));
      ra = R.toLower(largeText.repeat(2));
      ra = R.toUpper(largeText.repeat(2));

      // UTILITY
      ra = R.clone(objData100);
      ra = R.isEmpty(objData100);
      ra = R.equals(arrayData100, arrayData100no2);
      ra = R.isNil(false);
    },
  ]
};

module.exports = {
  CURRIED_PIPING_NUMBERS,
  CURRIED_PIPING_OBJECTS,
  CURRIED_PIPING_FUNCTIONAL,
  COMMON_METHODS
};