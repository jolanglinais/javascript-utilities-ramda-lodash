const _ = require('lodash');

const arrayData5 = _.range(5).map((i) => [[1, 2], [3, [4]], 5, 6, [7, 8]]);
const arrayData10 = _.range(10).map((i) => [[1, 2], [3, [4]], 5, 6, [7, 8]]);
const arrayData100 = _.range(100).map((i) => [[1, 2], [3, [4]], 5, 6, [7, 8]]);
const arrayData100no2 = _.range(100).map((i) => [[1, 2], [3, [4]], 5, 6, [7, 8]]);
const arrayData1000 = _.range(1000).map((i) => [[1, 2], [3, [4]], 5, 6, [7, 8]]);
const arrayData10000 = _.range(10000).map((i) => [[1, 2], [3, [4]], 5, 6, [7, 8]]);
const arrayDataReduce = _.range(1000).map((i) => i + 1);

module.exports = {
  arrayData5,
  arrayData10,
  arrayData100,
  arrayData100no2,
  arrayData1000,
  arrayData10000,
  arrayDataReduce
};