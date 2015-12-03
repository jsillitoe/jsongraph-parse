/**
 *
 */
'use strict';


describe('jsonGraph ', function () {

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
