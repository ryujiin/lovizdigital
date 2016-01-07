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
        'coockie':{
            deps:['jquery'],
            exports: 'coockie',
        },
        'bootstrap':{
            deps:['jquery'],
        },
        //'stripe':{
          //  exports: 'Stripe',
       // },
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
        coockie: 'vendor/coockie/jquery.cookie',
        //stripe:'//js.stripe.com/v2/?1',
        //stripe: 'vendor/stripe/stripe'
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

    function fixDiv() {
        if ($(window).scrollTop()> 34) {
            $('#header').addClass('fijo');
        }else{
            $('#header').removeClass('fijo');
        };

    }
    $(window).scroll(fixDiv);
    fixDiv();

    $(function(){

        $.ajaxSetup({
            crossDomain: true,
            beforeSend: function(xhr, settings) {
                var csrfSafeMethod = function(method) { 
                    // these HTTP methods do not require CSRF protection
                    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
                };
                if (!csrfSafeMethod(settings.type)) {
                    var csrftoken = $.cookie('csrftoken');
                    xhr.setRequestHeader("X-CSRFToken", csrftoken);
                }
            }
        });
    });
});