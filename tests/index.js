const { table } = require('table')
const _ = require('lodash');

const percentFromJS = (times) => {
  if (times.includes('N/A') || times.includes(0)) return 'N/A';
  const jsTime = times[0];
  const fastTime = Math.min(times[1], times[2]);
  const upOrDown = (jsTime > fastTime) ? '+' : '-';
  const percent = Math.floor(( Math.abs(jsTime - fastTime) / ( (jsTime + fastTime) / 2 ) ) * 100);
  return `${upOrDown}${percent}%`;
};

const perf = (name, checksum, fn, data, noList) => {
  const finalValue = checksum[0]();
  const timeResults = fn.map((arbFunc, i) => {
    if (
      ((i === 0) && noList?.noJS)
      || ((i === 1) && noList?.noLO)
      || ((i === 2) && noList?.noRA)
    ) return 'N/A'
    const start = Date.now();
    let result;
    for (let index = 0; index < data.length; index++) {
      data[index] = arbFunc(data[index]);
      [1, 2, 3, 4, 5, 6, 7, 8, 9].forEach(() => arbFunc(data[index]));

      result = data[index]
    }
    const time = Date.now() - start;
    if (!checksum[1] && !_.isEqual(finalValue, result)) {
      throw new Error;
    }
    return time;
  })

  return {
    name,
    timeJS: timeResults[0],
    timeLO: timeResults[1],
    timeRA: timeResults[2],
    diffJS: percentFromJS(timeResults),
  }
};

const print = (test) => {
  console.log(`Test: ${ test.test }`)
  console.log(table(
    [
      ['Name', 'JS Time [ms]',  '_ Time [ms]', 'R Time [ms]', 'Diff to JS'],
      ...test.results.map(r => [r.name, r.timeJS, r.timeLO, r.timeRA, r.diffJS]),
    ]
  ))
}

const test = (name, data, solutions) => {
  const results = {
    test: name,
    results: solutions.map(solution => perf(
      solution.name, solution.checksum, solution.fn, data, solution.noList
    ))
  }
  print(results)
  return results
}

module.exports = { test }