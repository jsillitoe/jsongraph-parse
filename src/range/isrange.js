/**
 * Copyright 2015, Joseph Sillitoe
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule isrange
 */

"use strict";


var isRange = function(rangeObj){
    var isrange = false;

    if (rangeObj.hasOwnProperty('from')){
        isrange = true;
    }else if (rangeObj.hasOwnProperty('to')){
        isrange = true;
    }else if (rangeObj.hasOwnProperty('length')){
        isrange = true;
    }
    return isrange;
};

module.exports = isRange;

