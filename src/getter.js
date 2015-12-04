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

var circularReferencesException = require('./errors/circularreferences');

var MAX_REFERENCES = 500;

var getter = function(pathset, jsonGraph){
    var json = JSON.parse(JSON.stringify(jsonGraph));
    var referenceCount = 0;

    var walkGraph = function(currentJson, path, currentDepth, graph){
        currentDepth = typeof currentDepth === 'undefined' ? 0 : currentDepth;
        graph = typeof graph === 'undefined' ? currentJson : graph;

        var nextDepth = currentDepth + 1;
        var nextElement = path[currentDepth];

        if (referenceCount > MAX_REFERENCES){
            throw(new circularReferencesException("Max References Exceeded", path, graph))
        }

        while (typeof currentJson=='object' && currentJson.hasOwnProperty('$type') && currentJson['$type']=='ref'){
            referenceCount = referenceCount + 1;
            currentJson = walkGraph(graph, currentJson['value'], 0, graph);
        }

        var nextJson = currentJson[nextElement];

        while (typeof nextJson=='object' && nextJson.hasOwnProperty('$type') && nextJson['$type']=='ref'){
            referenceCount = referenceCount + 1;
            nextJson = walkGraph(graph, nextJson['value'], 0, graph);
        }

        if (nextDepth == path.length){
            return nextJson;
        }else{
            return walkGraph(nextJson, path, nextDepth, graph);
        }
    };

    return walkGraph(json, pathset);
};

module.exports = getter;

