(function($public, $private) {
	
    $private.SELECTOR_INPUT_FROM = '#input-from';
    $private.SELECTOR_INPUT_DAILY = '#input-daily';
    $private.SELECTOR_TEMPLATE_OPTIONS = '#options-template';
    $private.SELECTOR_OPTIONS_CONTAINER = '#options-container';
    
    $private.offerId = UrlHelper.getQueryString('id') || 0;
    $private.from = null;
    $private.daily = null;
    
	$private.initLayout = function () {
		$(function(){
            $private.initEventsInputFrom();
            $private.initEventsInputDaily();
            $private.initData({}, function (err, data) {
                $private.initHeader(data);
                $private.initFilter(data);
            });
		});
	};
	
	$private.initHeader = function (data) {
        console.log('initHeader, data', data);
        $('#title').text(data.title);
        $('#location').text(data.location);
        $('#description').text(data.description);
		CarouselCustom.init('#header-carousel', data.photos);		
	};
	
    $private.initFilter = function (data) {
        $($private.SELECTOR_INPUT_DAILY).empty();
        $($private.SELECTOR_INPUT_FROM).empty();
        var i, j, dairyOptions, fromOptions;
        dairyOptions = [];
        fromOptions = [];
        for (i = 0; i < data.options.length; i++) {
            if (dairyOptions.indexOf(data.options[i].daily) === -1) {
                dairyOptions.push(data.options[i].daily);
            }
            for (j = 0; j < data.options[i].from.length; j++) {
                if (fromOptions.indexOf(data.options[i].from[j]) === -1) {
                    fromOptions.push(data.options[i].from[j]);
                }
            }
        }
        dairyOptions.sort(function(a, b){return a-b});
        $($private.SELECTOR_INPUT_DAILY).append('<option></option>');
        for (i = 0; i<dairyOptions.length;i++) {
            $($private.SELECTOR_INPUT_DAILY).append('<option>' + dairyOptions[i] + '</option>');
        }
        fromOptions.sort();
        $($private.SELECTOR_INPUT_FROM).append('<option></option>');
        for (i = 0; i<fromOptions.length;i++) {
            $($private.SELECTOR_INPUT_FROM).append('<option>' + fromOptions[i] + '</option>');
        }
    };
    
    $private.initEventsInputFrom = function () {
        $($private.SELECTOR_INPUT_FROM).on('change', function () {
            $private.from = $($private.SELECTOR_INPUT_FROM).val();
            $private.findOptions({
                offerId: $private.offerId,
                from: $($private.SELECTOR_INPUT_FROM).val(),
                daily: $($private.SELECTOR_INPUT_DAILY).val()
            }, function (err, data) {
                if (err) {
                    alert(err);
                } else {
                    $private.initLayoutOptions(data);
                }
            });
        });
    };
    
    $private.initEventsInputDaily = function () {
        $($private.SELECTOR_INPUT_DAILY).on('change', function () {
            $private.daily = $($private.SELECTOR_INPUT_DAILY).val();
            $private.findOptions({
                offerId: $private.offerId,
                from: $($private.SELECTOR_INPUT_FROM).val(),
                daily: $($private.SELECTOR_INPUT_DAILY).val()
            }, function (err, data) {
                if (err) {
                    alert(err);
                } else {
                    $private.initLayoutOptions(data);
                }
            });
        });
    };
    
    $private.findOptions = function (options, callback) {
        $.ajax({
            url: '/api/offers/' + options.offerId,
            type: 'GET',
            data: {
                from: options.from,
                daily: options.daily
            },
            success: function(data)
            {
                console.log('offer, data', data);
                callback(null, data);
            },
            error: function(err)
            {
                console.log('offer, err', err);
                callback(err, null);
            }
        });
    }
    
    $private.initLayoutOptions = function (data) {
        console.log('init options', data);
        var i, html = '';
        for (var i = 0; data && i< data.options.length; i++) {
            if (i === 0) {
                data.options[i].active = 'active';
            }
            data.options[i].rule = 'Cancelamento grátis';
            data.options[i].fromList = data.options[i].from.join('<br/>');
            data.options[i].price = CurrencyHelper.parseFloatToCurrency(data.options[i].price);
            html += TemplateHelper.render($($private.SELECTOR_TEMPLATE_OPTIONS).html(), data.options[i]);
        }
        $($private.SELECTOR_OPTIONS_CONTAINER).html(html);
    };
    
    $private.initData = function (options, callback) {
        $private.findOptions({
            offerId: $private.offerId,
            from: $private.from,
            daily: $private.daily
        }, function(err, data) {
            if (err) {
                alert(err);
            } else {
                $private.initLayoutOptions(data);
                callback(null, data);
            }
        });
    };
    
	$public.OfferController = {
		init : function() {
			$private.initLayout();
		}
	};
	
	$public.OfferController.init();
	
})(window, {});
