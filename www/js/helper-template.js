(function($public, $private){
    
    $private.renderTemplate = function(template, data) {
        var retorno = template;
        for(var attr in data){
           retorno = retorno.replace('{{' + attr + '}}', data[attr]);
        }
        return retorno;
    };
    
	$public.TemplateHelper = {    
        render: function (template, data) {
           return $private.renderTemplate(template, data);
        }   
    };
    
})(window, {});
