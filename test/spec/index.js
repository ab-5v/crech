var crech = require('../../index.js');
var sinon = require('sinon');
var expect = require('expect.js');

describe('decode', function() {

    beforeEach(function() {
        var that = this;
        this.parsed = {};
        this.cb = function(sel, group, bit) {
            that.parsed[group+sel] = bit;
        };

        sinon.spy(this, 'cb');
    });

    it('should ignore none string values', function() {
        crech.decode(null);
        crech.decode(undefined);
        crech.decode({});

        expect( this.cb.called ).to.be( false );
    });

    it('should ignore values with a wrong checksum', function() {
        crech.decode('f', '!');
        crech.decode('f!a', '!');
        crech.decode('f!a!b!f2!', '!');
        
        expect( this.cb.called ).to.be( false );
    });

    [
        ['f!a!b', {'fa': 0, 'fb': 1}],
        ['f!a,b!c', {'fa': 0, 'fb': 0, 'fc': 1}],
        ['f!a,b!c,d', {'fa': 0, 'fb': 0, 'fc': 1, 'fd': 1}],
        ['f!a!', {'fa': 0}],
        ['f!!a', {'fa': 1}],
        ['f!!', {}],
        ['f1!!!f2!a!b', {'f2a': 0, 'f2b': 1}],
        ['f1!a!b!f2!c!d', {'f1a': 0, 'f1b': 1, 'f2c': 0, 'f2d': 1}]
    ].forEach(function(one, i) {

        it('should decode "' + one[0] + '"', function() {
            crech.decode(one[0], '!', this.cb);
            expect( this.parsed ).to.eql( one[1] );
        });

    });

});

describe('encode', function() {

    var tests = [

        [[0, 's1', 'f1']],
        'f1!s1!',

        [[1, 's1', 'f1']],
        'f1!!s1',

        [[0, 's1', 'f1'], [0, 's2', 'f1']],
        'f1!s1,s2!',

        [[0, 's1', 'f1'], [1, 's2', 'f1']],
        'f1!s1!s2',

        [[0, 's1', 'f1'], [1, 's2', 'f2']],
        'f1!s1!!f2!!s2',

        [[0, 's1', 'f1'], [0, 's2', 'f2']],
        'f1!s1!!f2!s2!',

        [[0, 's1', 'f1'], [0, 's1', 'f2']],
        'f1!s1!!f2!s1!',

        [[0, 's1', 'f1'], [0, 's2', 'f1'], [1, 's3', 'f2'], [1, 's4', 'f2']],
        'f1!s1,s2!!f2!!s3,s4',
    ];

    tests.forEach(function(_, i) {
        if (i % 2) { return; }

        it('should encode to "' + tests[i+1] + '"', function() {
            expect( crech.encode(tests[i].reverse(), '!') ).to.eql( tests[i+1] );
        });
    });

});
