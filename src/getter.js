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


var getter = function(pathset, jsonGraph){
    var json = JSON.parse(JSON.stringify(jsonGraph));
    var pathLength = pathset.length;

    var walkGraph = function(currentJson, currentDepth){
        var nextDepth = currentDepth + 1;
        var nextElement = pathset[currentDepth];
        var nextJson = currentJson[nextElement];
        if (nextDepth == pathLength){
            return nextJson;
        }else{
            return walkGraph(nextJson, nextDepth);
        }
    };

    return walkGraph(json, 0);
};

module.exports = getter;

