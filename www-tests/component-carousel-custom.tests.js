var assert = require('assert'),
rewire = require('rewire'),
jquery,
selector,
appends = [];

describe('CarouselCustom\n', function() {

    beforeEach(function () {
        jquery = function (jquerySelector) {
            selector = jquerySelector;
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
            this.carousel = function () {
                return this;
            }
            return this;
        };
        window = {
            $: jquery
        };
        $ = jquery;
        CarouselCustom =  rewire('../www/js/component-carousel-custom');
    });
    
    it('should render html with 1 photo', function(done) {
        
        var photo1 = 'images/photo1.jpg';
        window.CarouselCustom.init('#header-carousel', [photo1]);
        assert(selector === '#header-carousel');
        assert(appends.join().indexOf(photo1) > 0);
        
        done();
        
    });
    
    it('should render html with 3 photos', function(done) {
        
        var photo1 = 'images/photo1.jpg', photo2 = 'images/photo2.jpg', photo3 = 'images/photo3.jpg';
        window.CarouselCustom.init('#header-carousel', [photo1, photo2, photo3]);
        assert(selector === '#header-carousel');
        
        assert(appends.join().indexOf(photo1) > 0);
        assert(appends.join().indexOf(photo2) > 0);
        assert(appends.join().indexOf(photo2) > 0);
        
        done();
        
    });
    
});
