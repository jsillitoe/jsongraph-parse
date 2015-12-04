/**
 *
 */
'use strict';


describe('jsonGraph ', function () {

    describe('get function', function(){


        describe('passing a json graph object',function(){

            it ('should follow $ref objects', function(){
                var jg = {'a': {"$type": 'ref', "value": ['b']}, 'b': { 'c': 'value'}};
                var thevalue = JsonGraph.get(['a','c'], jg);
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
                var thevalue = JsonGraph.get(['a','c'], jg);
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
                var thevalue = JsonGraph.get(['a'], jg);
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
                    var value = JsonGraph.get(['a','c'], jg);
                    console.log(JSON.stringify(value));
                };
                expect(runtest).to.throw(JsonGraph.errors.circularReferencesException);
            });


        });




        describe('passing a normal json object', function (){

            it ('should return a value from a simple object', function(){
                var json = {'a' : 'value'};
                var thevalue = JsonGraph.get(['a'], json);
                expect(thevalue).to.equal('value');
            });

            it ('should return a value from an object with depth', function(){
                var json = {'a' : {'b': {'c': 'value'}}};
                var thevalue = JsonGraph.get(['a','b','c'], json);
                expect(thevalue).to.equal('value');
            });

            it ('should return a object from an object with depth', function(){
                var json = {'a' : {'b': {'c': 'value'}}};
                var theobject = JsonGraph.get(['a','b'], json);
                expect(theobject).to.deep.equal({'c': 'value'});
            });

        });

    });



});