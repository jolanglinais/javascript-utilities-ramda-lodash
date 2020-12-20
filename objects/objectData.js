const _ = require('lodash');
const R = require('ramda');
const dataGenerator = require('./data-generation')

const objData5 = _.range(5).map((i) => dataGenerator());
const objData10 = _.range(10).map((i) => dataGenerator());
const objData100 = _.range(100).map((i) => dataGenerator());
const objData1000 = _.range(1000).map((i) => dataGenerator());
const mergeOne = R.merge(dataGenerator(), dataGenerator());
const mergeTwo = R.merge(dataGenerator(), dataGenerator());
const objDataReduce = {
  "name": "branch 1",
  "index": 1,
  "children": [{
    "name": "sub child 1",
    "index": 2,
    "children": [{
      "name": "subx2 child 1",
      "index": 3,
      "children": [{
        "name": "subx3 child 1",
        "index": 4,
        "children": [{
          "name": "subx4 child 1",
          "children": [{
            "name": "subx3 child 1",
            "index": 4,
            "children": [{
              "name": "subx4 child 1",
              "index": 21
            },
            ]
          },
          ]
        },
        ]
      },
      ]
    }]
  },
  ]
};

module.exports = {
  objData5,
  objData10,
  objData100,
  objData1000,
  mergeOne,
  mergeTwo,
  objDataReduce
};