/*
* Comparation of JavaScript utility libraries
*/

const { test } = require('./tests');

const {
  concat, each, filter, find, findIndex, flatten, fromPairs, fromPairsReduce, head, map, range, reduce, reject, tail, uniq, zip
 } = require('./arrays');

const {
  keys, merge, omit, pathShort, pathLong, pick, toPairs, values, zipObj
} = require('./objects');

const {
  toStringArray, toStringObject, toStringDate, split, toLower, toUpper
} = require('./strings');

const {
  clone, debounce, isEmpty, isEqual, isFunction, isNil, type
} = require('./utilities');

const {
  CURRIED_PIPING_NUMBERS,
  CURRIED_PIPING_OBJECTS,
  CURRIED_PIPING_FUNCTIONAL,
  COMMON_METHODS
} = require('./composition/totals');

const { arrayData1000, arrayData10000 } = require('./arrays/arrayData');
const { objData10, objData1000 } = require('./objects/objectData');

test('Arrays and Collections', arrayData1000, [
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
]);

test('Objects', objData1000, [
  keys,
  merge,
  omit,
  pathShort,
  pathLong,
  pick,
  toPairs,
  values,
  zipObj
]);

test('Strings', arrayData1000, [
  toStringArray,
  toStringObject,
  toStringDate,
  split,
  toLower,
  toUpper
]);

test('Utility', objData10, [
  clone,
  debounce,
  isEmpty,
  isEqual,
  isFunction,
  isNil,
  type
]);

test('Totals', objData10, [
  CURRIED_PIPING_NUMBERS,
  CURRIED_PIPING_OBJECTS,
  CURRIED_PIPING_FUNCTIONAL,
  COMMON_METHODS
]);
