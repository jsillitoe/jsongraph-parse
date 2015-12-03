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

var toArray = require('./range/toarray');

var getter = function(pathset, jsonGraph){
    var json = JSON.parse(JSON.stringify(jsonGraph));

    var walkGraph = function(currentJson, currentDepth, path, graph){
        var nextDepth = currentDepth + 1;
        var nextElement = path[currentDepth];
        var nextJson;

        if (typeof currentJson=='object' && currentJson.hasOwnProperty('$type') && currentJson['$type']=='ref'){
            currentJson = walkGraph(graph, 0, currentJson['value'], graph);
        }

        nextJson = currentJson[nextElement];

        if (nextDepth == path.length){
            return nextJson;
        }else{
            return walkGraph(nextJson, nextDepth, path, graph);
        }
    };

    return walkGraph(json, 0, pathset, json);
};

module.exports = getter;

