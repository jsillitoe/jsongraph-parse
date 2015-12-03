/**
 * Copyright 2015, Joseph Sillitoe
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule range
 */

"use strict";

var normalize = require('./normalize');
var toArray = require('./toarray');

var range = {

    'normalize': normalize,
    'toArray': toArray

};

module.exports = range;
