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
        'stripe':{
            exports: 'Stripe',
        }
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
        stripe:'//js.stripe.com/v2/?1',
    }
});

require([
    'backbone',
    '../js/backbone_oficina/routers/oficina_rutas',
    '../js/backbone_oficina/views/oficina',
], function (Backbone,Rutas,Oficina) {
    var ofinaRuta = new Oficina(Rutas);

    Backbone.history.start({
        pushState:true,
    });
});