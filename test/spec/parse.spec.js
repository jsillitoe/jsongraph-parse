/**
 *
 */
'use strict';


describe('jsonGraph ', function () {

    describe('parsing', function(){

        describe('passing a json graph object',function(){

            it('should work on the example provided in the readme', function(){

                var graph = {
                    "user_preferencesById": {
                        "1": {
                            "user": {
                                "value": ["usersById", "1"],
                                "$type": "ref"
                            },
                            "key": "favorite_color",
                            "user_id": 1,
                            "value": "Black",
                            "id": 1
                        }
                    },
                    "usersById": {
                        "1": {
                            "id": 1,
                            "firstname": "Jane",
                            "lastname": "Smith",
                            "preferences": [{
                                "value": ["user_preferencesById", "1"],
                                "$type": "ref"
                            }]
                        }
                    },
                    "user": {
                        "value": ["usersById", "1"],
                        "$type": "ref"
                    }
                };
                var color = JsonGraph.parse(graph, ['user', 'preferences', 0, 'value']); // Black
                expect(color).to.equal('Black');
            });


            it ('should follow $ref objects', function(){
                var jg = {'a': {"$type": 'ref', "value": ['b']}, 'b': { 'c': 'value'}};
                var thevalue = JsonGraph.parse(jg, ['a','c']);
                expect(thevalue).to.equal('value');
            });


            it ('should follow multiple $ref objects', function(){
                var jg = {
                    'a': {"$type": 'ref', "value": ['b']},
                    'b': {
                        'c': {"$type": 'ref', "value": ['d']}
                    },
                    'd': 'value'
                };
                var thevalue = JsonGraph.parse(jg, ['a','c']);
                expect(thevalue).to.equal('value');
            });


            it ('should follow a $ref to a $ref', function(){
                var jg = {
                    'a': {"$type": 'ref', "value": ['b', 'c']},
                    'b': {
                        'c': {"$type": 'ref', "value": ['d']}
                    },
                    'd': 'value'
                };
                var thevalue = JsonGraph.parse(jg, ['a']);
                expect(thevalue).to.equal('value');
            });


            it ('should error out following circular references', function(){
                var runtest = function(){
                    var jg = {
                        'a': {"$type": 'ref', "value": ['b']},
                        'b': {
                            'red': 'herring',
                            'c': {"$type": 'ref', "value": ['d']}
                        },
                        'd': {"$type": 'ref', "value": ['b', 'c']}
                    };
                    var value = JsonGraph.parse(jg, ['a','c']);
                    console.log(JSON.stringify(value));
                };
                expect(runtest).to.throw(JsonGraph.errors.circularReferencesException);
            });

        });


        describe('passing a normal json object', function (){

            it ('should return a value from a simple object', function(){
                var json = {'a' : 'value'};
                var thevalue = JsonGraph.parse(json, ['a']);
                expect(thevalue).to.equal('value');
            });

            it ('should return a value from an object with depth', function(){
                var json = {'a' : {'b': {'c': 'value'}}};
                var thevalue = JsonGraph.parse(json, ['a','b','c']);
                expect(thevalue).to.equal('value');
            });

            it ('should return a object from an object with depth', function(){
                var json = {'a' : {'b': {'c': 'value'}}};
                var theobject = JsonGraph.parse(json, ['a','b']);
                expect(theobject).to.deep.equal({'c': 'value'});
            });

        });

    });



});