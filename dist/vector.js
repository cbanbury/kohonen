'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.random = exports.normalize = exports.add = exports.diff = exports.mult = exports.dotProduct = exports.dist = undefined;

var _fp = require('lodash/fp');

var _fp2 = _interopRequireDefault(_fp);

var _d3Random = require('d3-random');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// euclidian distance of 2 vectors
var dist = exports.dist = function dist(v1, v2) {
  var d = Math.sqrt(v1.reduce(function (seed, cur, ind) {
    return seed + Math.pow(v2[ind] - cur, 2);
  }, 0));
  if (isNaN(d) || !isFinite(d)) {
    throw new Error('vector.dist : not a number');
  }
  return d;
};

var dotProduct = exports.dotProduct = function dotProduct(v1, v2) {
  var sum = 0;
  v1.map(function (item, index) {
    sum += item * v2[index];
  });

  return sum;
};

// scalar mult of a vector
var mult = exports.mult = function mult(v, coef) {
  return v.map(function (val) {
    return val * coef;
  });
};

// scalar diff of a vector
var diff = exports.diff = function diff(v1, v2) {
  return v1.map(function (val, i) {
    return v2[i] - val;
  });
};

// scalar addition of a vector
var add = exports.add = function add(v1, v2) {
  return v1.map(function (val, i) {
    return v2[i] + val;
  });
};

// scale vector between 0 and 1
var normalize = exports.normalize = function normalize(v) {
  var max = _fp2.default.max(v);
  var min = _fp2.default.min(v);
  var range = max - min;
  return v.map(function (x) {
    // gracefully handle divide by zero
    if (range === 0) {
      return 0;
    }
    return (x - min) / range;
  });
};

// For a given size, return an array of `size` with random values
// within the gaussian normalization
//
// https://github.com/mbostock/d3/wiki/Math
var random = exports.random = function random(size) {
  var mean = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.0;
  var deviation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1.0;
  return _fp2.default.map(function (i) {
    return (0, _d3Random.randomNormal)(mean, deviation)();
  }, _fp2.default.range(0, size));
};