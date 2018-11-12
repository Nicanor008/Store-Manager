
let expect  = require('chai').expect;
let request = require('request');
const login = require('../js/login')

describe('Login Users', () => {
    it('Users Login', function(done) {
            let result = login;
            expect(result).to.equal(true)
            done();
    });
});
