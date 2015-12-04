/**
 * Copyright 2015, Joseph Sillitoe
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule getter
 */

"use strict";

var parse = require('./parse.js');


/**
 * Accept an array of path sets to parse the graph with.
 *
 * @param pathsets - An array of path sets.
 * @param jsonGraph - the graph object to parse.
 * @returns {*}
 */
var getter = function(pathsets, jsonGraph){



    return parse(jsonGraph, pathset);
};

module.exports = getter;

