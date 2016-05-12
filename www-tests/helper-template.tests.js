var assert = require('assert'),
result;

describe('TemplateHelper\n', function() {

    before(function () {
        window = {};
        TemplateHelper =  require('../www/js/helper-template');
    });
    
    it('should render html using data with one element', function(done) {
        
        result = window.TemplateHelper.render('<div>{{info}}</div>', { info: 'Test'});
        assert(result === '<div>Test</div>');
        
        done();
        
    });

    it('should render html using data with multiple elements', function(done) {
        
        result = window.TemplateHelper.render('<div><h1>{{title}}</h1><p>{{value}}</p></div>', { title: 'Test', value: 1});
        assert(result === '<div><h1>Test</h1><p>1</p></div>');
        
        done();
        
    });
    
});
