var assert = require('assert'),
result;

describe('CurrencyHelper\n', function() {

    before(function () {
        window = {};
        CurrencyHelper =  require('../www/js/helper-currency');
    });
    
    it('should format currency greater than 1kk', function(done) {
        
        result = window.CurrencyHelper.parseFloatToCurrency(10001000);
        assert(result === '10.001.000');
        
        done();
        
    });
    
    it('should format currency greater than 1k', function(done) {
        
        result = window.CurrencyHelper.parseFloatToCurrency(1009);
        assert(result === '1.009');
        
        done();
        
    });
    
    it('should format currency less than 100', function(done) {
        
        result = window.CurrencyHelper.parseFloatToCurrency(102);
        assert(result === '102');
        
        done();
        
    });
    
    it('should format currency with decimal value', function(done) {
        
        result = window.CurrencyHelper.parseFloatToCurrency(99);
        assert(result === '99');
        
        done();
        
    });
    
});
