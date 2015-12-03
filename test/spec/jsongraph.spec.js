/**
 *
 */
'use strict';


describe('jsonGraph ', function () {

    it('should exist', function(){
        expect(JsonGraph).to.exist;
    });

    describe('get function', function(){

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

        });

    });

    describe('pathset', function(){

        describe('range object', function(){

            describe('array conversion', function(){

                it('should convert to array', function(){
                    var range = {"from": 2, "to": 5};
                    var rangearray = JsonGraph.range.toArray(range);
                    expect(rangearray).to.deep.equal([2,3,4]);
                });

            });

            describe('normalization', function(){

                it ('should not change an already normalized ', function(){
                    var range = {"from": 0, "to": 5};
                    var normalrange = JsonGraph.range.normalize(range);
                    expect(normalrange).to.deep.equal(range);
                });

                it ('should normalize when missing the "from" property', function(){
                    var range = {"to": 5};
                    var normalrange = JsonGraph.range.normalize(range);
                    expect(normalrange).to.deep.equal({"from": 0, "to": 5});
                });

                it ('should normalize when missing the "to" property', function(){
                    var range = {"from": 5};
                    var normalrange = JsonGraph.range.normalize(range);
                    expect(normalrange).to.deep.equal({"from": 5, "to": 5});
                });

                it ('should normalize when missing the "from" and "to" properties', function(){
                    var range = {};
                    var normalrange = JsonGraph.range.normalize(range);
                    expect(normalrange).to.deep.equal({"from": 0, "to": 0});
                });

                it ('should normalize when "to" property is less than the "from" property', function(){
                    var range = {"from": 5, "to": 0};
                    var normalrange = JsonGraph.range.normalize(range);
                    expect(normalrange).to.deep.equal({"from": 5, "to": 5});
                });

                it ('should normalize with only a "length" property', function(){
                    var range = {"length": 5};
                    var normalrange = JsonGraph.range.normalize(range);
                    expect(normalrange).to.deep.equal({"from": 0, "to": 4});
                });

                it ('should normalize with a "length" and "from" property', function(){
                    var range = {"from": 2, "length": 5};
                    var normalrange = JsonGraph.range.normalize(range);
                    expect(normalrange).to.deep.equal({"from": 2, "to": 6});
                });


                it ('should normalize with a "length" and "to" property', function(){
                    var range = {"to": 9, "length": 5};
                    var normalrange = JsonGraph.range.normalize(range);
                    expect(normalrange).to.deep.equal({"from": 4, "to": 9});
                });

            });

        });

    });

});

