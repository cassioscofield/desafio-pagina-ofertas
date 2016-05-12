var assert = require('assert'),
result;

describe('UrlHelper\n', function() {

    before(function () {
        window = {location: {}};
        UrlHelper =  require('../www/js/helper-url');
    });
    
    it('should return key value when url is passed along', function(done) {
        
        result = window.UrlHelper.getQueryString('id', 'http://localhost/?id=1');
        assert(result === '1');
        
        done();
        
    });
    
    it('should return values when url is passed along with multiple keys', function(done) {
        
        result = window.UrlHelper.getQueryString('id', 'http://localhost/?id=2&from=Salvador');
        assert(result === '2');
        result = window.UrlHelper.getQueryString('from', 'http://localhost/?id=2&from=Salvador');
        assert(result === 'Salvador');
        
        done();
        
    });
    
    it('should return key value when no url is passed along', function(done) {
        
        window.location.href = 'http://localhost/?id=3';
        result = window.UrlHelper.getQueryString('id', null);
        assert(result === '3');
        
        done();
        
    });

});
