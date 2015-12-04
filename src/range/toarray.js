/**
 * Copyright 2015, Joseph Sillitoe
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule toarray
 */

"use strict";

var normalize = require('./normalize');

var toArray = function(rangeObj){
    rangeObj = normalize(rangeObj);
    var rangeArray = [];
    for (var x=rangeObj.from;x<rangeObj.to;x++){
        rangeArray.push(x);
    }
    return rangeArray;
};

module.exports = toArray;

