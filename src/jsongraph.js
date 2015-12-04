/**
 * Copyright 2015, Joseph Sillitoe
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule jsonGraph
 */

"use strict";


var getpaths = require('./getpaths.js');
var parse = require('./parse.js');
var range = require('./range');
var errors = require('./errors');

var jsonGraph = {
    'getPaths': getpaths,
    'range': range,
    'errors': errors,
    'parse': parse
};


module.exports = jsonGraph;