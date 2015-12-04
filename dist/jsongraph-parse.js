(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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


var circularReferencesException = function(message, pathset, json){
    this.message = message;
    this.pathset = pathset;
    this.json = json;
};

module.exports = circularReferencesException;

},{}],2:[function(require,module,exports){
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

},{"./circularreferences":1}],3:[function(require,module,exports){
(function (global){
/**
 * Copyright 2015, Joseph Sillitoe
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

"use strict";

var obj;

if (typeof window !== "undefined") {
    obj = window;
} else if (typeof global !== "undefined") {
    obj = global;
} else if (typeof self !== "undefined") {
    obj = self;
} else {
    obj = this;
}

obj.JsonGraph = require('./jsongraph');

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./jsongraph":4}],4:[function(require,module,exports){
/**
 * Copyright 2015, Joseph Sillitoe
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule jsonGraph
 */

"use strict";

var parse = require('./parse.js');
var range = require('./range');
var errors = require('./errors');

var jsonGraph = {
    'range': range,
    'errors': errors,
    'parse': parse
};


module.exports = jsonGraph;
},{"./errors":2,"./parse.js":5,"./range":6}],5:[function(require,module,exports){
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


},{"./errors/circularreferences":1}],6:[function(require,module,exports){
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
var isRange = require('./isrange');

var range = {

    'normalize': normalize,
    'toArray': toArray,
    'isRange': isRange

};

module.exports = range;

},{"./isrange":7,"./normalize":8,"./toarray":9}],7:[function(require,module,exports){
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


},{}],8:[function(require,module,exports){
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

var isRange = require('./isrange');


var normalize = function(rangeObj){

    if (!isRange(rangeObj)){
        // we can't normalize it if it's not a range object.  just return it.
        return rangeObj;
    }

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


},{"./isrange":7}],9:[function(require,module,exports){
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


},{"./normalize":8}]},{},[3]);
