(function($public){
 
    $public.UrlHelper = {     
        getQueryString: function (field, url) {	
            var href, reg, param;
            href = url ? url : window.location.href;
            reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
            param = reg.exec(href);
            return param ? param[1] : null;
        }
    }
    
})(window);
