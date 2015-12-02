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
