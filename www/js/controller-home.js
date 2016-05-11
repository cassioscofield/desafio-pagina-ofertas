(function($public, $private) {
	
	$private.initLayout = function() {
		$(function(){
			$private.initCarousel();			
		});		
	};
	
	$private.initCarousel = function(){
		CarouselCustom.init('#myCarousel', [
			{src : './images/photo1.jpg'},
			{src : './images/photo2.jpg'},
			{src : './images/photo3.jpg'},
			{src : './images/photo4.jpg'},
			{src : './images/photo1.jpg'},
			{src : './images/photo2.jpg'},
			{src : './images/photo3.jpg'},
			{src : './images/photo4.jpg'},
			{src : './images/photo2.jpg'},
			{src : './images/photo3.jpg'},
			{src : './images/photo4.jpg'},
			{src : './images/photo5.jpg'}
		]);		
	};
	
	$public.HomeController = {
		init : function() {
			$private.initLayout();
			
		}
	};
	
	$public.HomeController.init();
	
})(window, {});