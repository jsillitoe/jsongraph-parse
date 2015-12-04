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


var getter = require('./getter.js');
var range = require('./range');
var errors = require('./errors');

var jsonGraph = {
    'get': getter,
    'range': range,
    'errors': errors


};


module.exports = jsonGraph;