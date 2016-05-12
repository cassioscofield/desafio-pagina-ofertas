var assert = require('assert'),
rewire = require('rewire'),
jquery,
selectors = [],
onload,
listeners = [],
listenersMethods = [],
appends = [],
val;

describe('OfferController\n', function () {

    beforeEach(function () {
        jquery = function (jquerySelectorOrFunction) {
            if (typeof jquerySelectorOrFunction === 'function') {
                onload = jquerySelectorOrFunction;
            } else {
                selectors.push(jquerySelectorOrFunction);
            }
            this.addClass = function () {
                return this;
            }
            this.append = function (data) {
                appends.push(data);
                return this;
            }
            this.find = function () {
                return this;
            }
            this.on = function (data, method) {
                listeners.push(data);
                listenersMethods.push(method);
                return this;
            }
            this.val = function () {
                return val;
            }
            return this;
        };
        UrlHelper = {
            getQueryString: function () {
                return 0;
            }
        };
        $ = jquery;
        window = {
            $: jquery
        };
    });
    
    describe('Setup\n', function () {
    
        it('should call UrlHelper.getQueryString', function (done) {
            
            UrlHelper = {
                getQueryString: function () {
                    done();
                }
            };
            
            OfferController =  rewire('../www/js/controller-offer');
            
            window.OfferController.init();
            
        });
        
        it('should listen for jquery onload', function (done) {
            
            OfferController =  rewire('../www/js/controller-offer');
            
            window.OfferController.init();
            assert(onload);
            
            done();
            
        });
        
        it('should init change events when jquery is loaded', function (done) {
            
            OfferController =  rewire('../www/js/controller-offer');
            
            window.OfferController.init();
            
            $.ajax = function () {
                
            };
            onload();
            
            assert(selectors.length >= 2);
            assert(listeners[0] === 'change');
            assert(listeners[1] === 'change');
            
            done();
            
        });
        
        it('should call ajax to load data', function (done) {
            
            OfferController =  rewire('../www/js/controller-offer');
            
            window.OfferController.init(); 
            
            $.ajax = function (options) {
            assert(options.url === '/api/offers/0');
            assert(options.type === 'GET');
            done();  
            };
            
            onload();
            
        });
    
    });
    
    it('should call ajax on change from', function (done) {
            
        OfferController =  rewire('../www/js/controller-offer');
        
        window.OfferController.init(); 
        
        var ajaxCount = 0;
        $.ajax = function (options) {
            assert(options.url === '/api/offers/0');
            assert(options.type === 'GET');
            if (ajaxCount === 1) {
                assert(options.data.from, 'Salvador');
            }
            if (ajaxCount === 2) {
                assert(options.data.daily, 1);
                done();
            }
            ajaxCount++;
        };
        
        onload();
        
        val = 'Salvador';
        listenersMethods[0]();
        
        val = 1;
        listenersMethods[1]();
        
    });
    
});
