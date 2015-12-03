/**
 * Copyright 2015, Joseph Sillitoe
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule parse
 */

"use strict";


var parse = require('./parse.js');
var range = require('./range');

var jsonGraph = {
    'parse': parse,
    'range': range

};


module.exports = jsonGraph;