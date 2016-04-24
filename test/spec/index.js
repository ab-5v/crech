var crech = require('../../index.js');
var expect = require('expect.js');

describe('decode', function() {

    beforeEach(function() {
        var that = this;
        this.parsed = {};
        this.cb = function(sel, group, bit) {
            that.parsed[group+sel] = bit;
        };
    });

    [
        ['f%a%b', {'fa': 0, 'fb': 1}],
        ['f%a,b%c', {'fa': 0, 'fb': 0, 'fc': 1}],
        ['f%a,b%c,d', {'fa': 0, 'fb': 0, 'fc': 1, 'fd': 1}],
        ['f%a%', {'fa': 0}],
        ['f%%a', {'fa': 1}],
        ['f%%', {}],
        ['f1%%%f2%a%b', {'f2a': 0, 'f2b': 1}],
        ['f1%a%b%f2%c%d', {'f1a': 0, 'f1b': 1, 'f2c': 0, 'f2d': 1}]
    ].forEach(function(one, i) {

        it('should decode "' + one[0] + '"', function() {
            crech.decode(one[0], '%', this.cb);
            expect( this.parsed ).to.eql( one[1] );
        });

    });

});
