'use strict';

require.config({
	shim: {
        'owl':{
            deps:['jquery'],
            exports: 'owlCarousel'
        },
        swig: {
            exports: 'Swig'
        },
        'zoom':{
            deps:['jquery'],
            exports: 'zoom',
        },
        'storage':{
            deps:['jquery'],
            exports: 'storage',
        },
        'bootstrap':{
            deps:['jquery'],
        },
        //'stripe':{
          //  exports: 'Stripe',
        //}
    },
    paths: {
        jquery: 'vendor/bower_components/jquery/dist/jquery',
        backbone: 'vendor/bower_components/backbone/backbone',
        underscore: 'vendor/bower_components/lodash/dist/lodash',
        bootstrap: 'vendor/bootstrap/bootstrap',
        swig: 'vendor/swig/swig',
        owl: 'vendor/owl/owl.carousel',
        zoom: 'vendor/bower_components/jquery-zoom/jquery.zoom',
        storage: 'vendor/bower_components/jQuery-Storage-API/jquery.storageapi',
        //stripe:'//js.stripe.com/v2/?1',
    }
});

require([
    'backbone',
    '../js/backbone/routers/rutas',
    '../js/backbone/views/app',
    '../js/backbone/collections/categoria',
], function (Backbone,Rutas,App,Categorias,ProductosTotal) {
    var app = new App(Rutas);

    /* Views */
    Categorias.fetch().done(function () {
        Backbone.history.start({
            pushState:true,
        });
    })

    $(function(){
        function getCookie(name) {
            var cookieValue = null;
            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = jQuery.trim(cookies[i]);
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) == (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
        var csrftoken = getCookie('csrftoken');
        $.ajaxSetup({
            crossDomain: true,
            beforeSend: function(xhr, settings) {
                var csrfSafeMethod = function(method) { 
                    // these HTTP methods do not require CSRF protection
                    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
                };
                if (!csrfSafeMethod(settings.type)) {
                    xhr.setRequestHeader("X-CSRFToken", csrftoken);
                }
            }
        });
    });
});