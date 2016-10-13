/*global define*/

define([
    'jquery',
    'backbone',
], function ($, Backbone) {
    'use strict';

    var AppRouter = Backbone.Router.extend({
        routes: {
            "oficina/":"root",
            'oficina/catalogo/':'catalogo',
            '*notFound': 'notFound',
        },

        initialize:function(){
        },
        root:function(){            
            console.log('root')
        },
        catalogo:function(){
            console.log('catalogo');
        },
        notFound:function () {
        },
    });

    var rutas = new AppRouter();

    return rutas;
});