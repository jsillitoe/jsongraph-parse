/**
 *
 */
'use strict';


describe('jsonGraph ', function () {

    it('should exist', function(){
        expect(JsonGraph).to.exist;
    });

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

