(function($public){
 
    $public.CurrencyHelper = {     
        parseFloatToCurrency: function (num) {	

            var x = 0,  i = 0;   
            
            if(num < 0){
                num = Math.abs(num);
                x = 1;
            }
            
            if(isNaN(num)) num = '0';
            
            num = Math.floor((num*100+0.5)/100).toString();
            
            for (i = 0; i < Math.floor((num.length-(1+i))/3); i++)
            {
                num = num.substring(0, num.length-(4*i+3)) + '.'
                    + num.substring(num.length-(4*i+3));
            }
            ret = num;
            
            if (x === 1) ret = ' - ' + ret;
            
            return ret;	
        }
    }
    
})(window, {});
