/**
 * Copyright 2015, Joseph Sillitoe
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule normalize
 */

"use strict";


var normalize = function(rangeObj){
    var normalized = {};
    normalized.from = rangeObj.hasOwnProperty('from') ? rangeObj.from : 0;
    normalized.to = rangeObj.hasOwnProperty('to') ? rangeObj.to : normalized.from;
    normalized.to = normalized.to < normalized.from ? normalized.from : normalized.to;
    if (rangeObj.hasOwnProperty("length") && !rangeObj.hasOwnProperty("from") && !rangeObj.hasOwnProperty("to")){
        // only a 'length' property.
        normalized.to = normalized.from + rangeObj.length - 1; //TODO explain the magic of the -1.
    }
    else if (rangeObj.hasOwnProperty("length") && rangeObj.hasOwnProperty("from") && !rangeObj.hasOwnProperty("to")){
        // 'length' and 'from' properties.
        normalized.to = normalized.from + rangeObj.length - 1; //TODO explain the magic of the -1.
    }
    else if (rangeObj.hasOwnProperty("length") && rangeObj.hasOwnProperty("to") && !rangeObj.hasOwnProperty("from")){
        // 'length' and 'to' properties
        normalized.from = normalized.to - rangeObj.length;
    }
    return normalized;
};

module.exports = normalize;

