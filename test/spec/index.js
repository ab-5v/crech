var crech = require('../../index.js');
var expect = require('expect.js');

describe('encode', function() {

    it('should return string', function() {
        expect( crech.encode() ).to.be.a( 'string' );
    });

});

describe('decode', function() {

    it('should return array', function() {
        expect( crech.decode() ).to.be.an( 'array' );
    });

});
