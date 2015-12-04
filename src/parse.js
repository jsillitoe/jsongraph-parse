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

var circularReferencesException = require('./errors/circularreferences');
var MAX_REFERENCES = 500;

var parse = function(currentJson, path, currentDepth, graph, referenceCount){
    currentDepth = typeof currentDepth === 'undefined' ? 0 : currentDepth;
    graph = typeof graph === 'undefined' ? currentJson : graph;
    referenceCount = typeof referenceCount === 'undefined' ? 0 : referenceCount;

    var nextDepth = currentDepth + 1;
    var nextElement = path[currentDepth];

    if (referenceCount > MAX_REFERENCES){
        throw(new circularReferencesException("Max References Exceeded", path, graph))
    }

    while (typeof currentJson=='object' && currentJson.hasOwnProperty('$type') && currentJson['$type']=='ref'){
        referenceCount = referenceCount + 1;
        currentJson = parse(graph, currentJson['value'], payload, 0, graph, referenceCount);
    }

    var nextJson = currentJson[nextElement];

    while (typeof nextJson=='object' && nextJson.hasOwnProperty('$type') && nextJson['$type']=='ref'){
        referenceCount = referenceCount + 1;
        nextJson = parse(graph, nextJson['value'], 0, graph, referenceCount);
    }

    if (nextDepth == path.length){
        return nextJson;
    }else{
        return parse(nextJson, path, nextDepth, graph, referenceCount);
    }
};


module.exports = parse;

