/**
 *
 *
 */

"use strict";

export default class Parser {

    constructor(jsonGraph) {
        this.jsonGraph = JSON.parse(JSON.stringify(jsonGraph));


    }

    getNode(pathSet) {

        var walk = function(currentPathSet, currentObject){
            let nextPathset = "";

        };

        return walk(pathSet, this.jsonGraph);

    }

}