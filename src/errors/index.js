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

var circularReferencesException = require('./circularreferences');


var errors = {

    'circularReferencesException': circularReferencesException

};

module.exports = errors;
