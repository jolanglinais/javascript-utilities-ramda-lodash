const _ = require('lodash');
const R = require('ramda');

const { arrayData10 } = require('../arrays/arrayData');
const { mergeOne } = require('../objects/objectData');
const { stringDate, largeText } = require('./stringData');

const toStringArray = {
  name: 'toString (array) NOTE _',
  checksum: [() => JSON.stringify(arrayData10), true],
  fn: [
    () => JSON.stringify(arrayData10),
    () => _.toString(arrayData10),
    () => R.toString(arrayData10),
  ],
};

const toStringObject = {
  name: 'toString (object) NOTE _',
  checksum: [() => JSON.stringify(mergeOne), true],
  fn: [
    () => JSON.stringify(mergeOne),
    () => _.toString(mergeOne),
    () => R.toString(mergeOne),
  ]
};

const toStringDate = {
  name: 'toString (date) NOTE _',
  checksum: [() => JSON.stringify(stringDate), true],
  fn: [
    () => JSON.stringify(stringDate),
    () => _.toString(stringDate),
    () => R.toString(stringDate),
  ]
};

const split = {
  name: 'split',
  checksum: [() => largeText.repeat(2).split(' ')],
  fn: [
    () => largeText.repeat(2).split(' '),
    () => _.split(largeText.repeat(2), ' '),
    () => R.split(' ', largeText.repeat(2)),
  ]
};

const toLower = {
  name: 'toLower',
  checksum: [() => largeText.repeat(2).toLowerCase()],
  fn: [
    () => largeText.repeat(2).toLowerCase(),
    () => _.toLower(largeText.repeat(2)),
    () => R.toLower(largeText.repeat(2)),
  ]
};

const toUpper = {
  name: 'toUpper',
  checksum: [() => largeText.repeat(2).toUpperCase()],
  fn: [
    () => largeText.repeat(2).toUpperCase(),
    () => _.toUpper(largeText.repeat(2)),
    () => R.toUpper(largeText.repeat(2)),
  ]
};

module.exports = {
  toStringArray,
  toStringObject,
  toStringDate,
  split,
  toLower,
  toUpper
};
