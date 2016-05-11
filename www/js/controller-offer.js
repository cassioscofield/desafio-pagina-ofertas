(function($public, $private) {
	
    $private.SELECTOR_INPUT_FROM = '#input-from';
    $private.SELECTOR_INPUT_DIARY = '#input-diary';
    $private.SELECTOR_TEMPLATE_OPTIONS = '#options-template';
    $private.SELECTOR_OPTIONS_CONTAINER = '#options-container';
    
    $private.offerId = UrlHelper.getQueryString('id') || 0;
    $private.from = null;
    $private.diary = null;
    
	$private.initLayout = function () {
		$(function(){
            $private.initEventsInputFrom();
            $private.initEventsInputDiary();
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
        $('#input-diary').empty();
        $('#input-from').empty();
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
        for (i = 0; i<dairyOptions.length;i++) {
            $('#input-diary').append('<option>' + dairyOptions[i] + '</option>');
        }
        fromOptions.sort();
        for (i = 0; i<fromOptions.length;i++) {
            $('#input-from').append('<option>' + fromOptions[i] + '</option>');
        }
    };
    
    $private.initEventsInputFrom = function () {
        console.log('initEventsInputFrom');
        $($private.SELECTOR_INPUT_FROM).on('change', function () {
            $private.from = $(this).val();
            console.log('from', $private.from);
            $private.findOptions({
                offerId: $private.offerId,
                from: $($private.SELECTOR_INPUT_FROM).val(),
                daily: $($private.SELECTOR_INPUT_DIARY).val()
            }, function (err, data) {
                if (err) {
                    alert(err);
                } else {
                    $private.initLayoutOptions(data);
                }
            });
        });
    };
    
    $private.initEventsInputDiary = function () {
        console.log('initEventsInputDiary');
        $($private.SELECTOR_INPUT_DIARY).on('change', function () {
            $private.diary = $(this).val();
            console.log('diary', $private.diary);
            $private.findOptions({
                offerId: $private.offerId,
                from: $($private.SELECTOR_INPUT_FROM).val(),
                daily: $($private.SELECTOR_INPUT_DIARY).val()
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
