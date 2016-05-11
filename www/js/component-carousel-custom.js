(function($public, $private){
				
	$private.renderCarouselInner = function(seletorContainer, imgList) {
        var i, img, active, item;
		for(var i = 0; i < imgList.length; i++){
			img = imgList[i];
			active = i === 0 ? 'active' : '';
			item = [
                '<div class="item ' + active + '">',
                '<img src="' + img + '"   />',
                '</div>'
            ].join('');
			$(seletorContainer).find('.carousel-inner').append(item);
		}
	};
	
	$private.renderIndicators = function(seletorContainer, imgList){
        var i, item, img, active;
		for(i = 0; i < imgList.length; i++){
			img = imgList[i];			
			active = i === 0 ? 'active' : ''; 
			if (i === 8){
				item = [
                    '<li data-target="' + seletorContainer + '" class="item-size" data-slide-to="' + i + '" >',
                    '<div class="row">+' + (imgList.length - i) + '</div>',
                    '</li>'
                ].join('');
				$(seletorContainer).find('.carousel-indicators').append(item);
			}
			item = [
                '<li data-target="' + seletorContainer + '" data-slide-to="' + i + '"  class="' + active + '">',
                '<img src="' + img + '"   />',
                '</li>'
            ].join('');
			$(seletorContainer).find('.carousel-indicators').append(item);
		}
	};
	
	$private.configureCarousel = function(seletorContainer) {
		$(seletorContainer)
			.addClass('carousel')
			.addClass('slide') 
			.append('<ol class="carousel-indicators"></ol>')
			.append('<div class="carousel-inner" role="listbox">');
	};
	
	
	
	$private.addControl = function(seletorContainer, position, action) {
        var seta;
        seta = [
            '<a class="' + position + ' carousel-control" href="' + seletorContainer + '" role="button" data-slide="' + action + '">',
            '<span class="glyphicon glyphicon-chevron-' + position + '" aria-hidden="true"></span>',
            '</a>'
        ].join('');
		$(seletorContainer).append(seta); 
	};
	
	$public.CarouselCustom = {			
		init : function(seletorContainer, imgList){
			$private.configureCarousel(seletorContainer);
			$private.renderIndicators(seletorContainer, imgList);
			$private.renderCarouselInner(seletorContainer, imgList);
			$private.addControl(seletorContainer, 'left', 'prev');
			$private.addControl(seletorContainer, 'right', 'next');
			$(seletorContainer).carousel();
		}
	};
	
})(window, {});
