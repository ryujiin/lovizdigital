/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    '../models/user',
    '../views/usuario/user_links',
    'carro',
    '../views/carro/mini_carro',
], function ($, _, Backbone,UserModel,UserLinkView,CarroModel,MiniCarro) {
    'use strict';

    var AppView = Backbone.View.extend({
        el:$('body'),
        className: '',

        events: {
            'click .link': 'navegar',
            'click .no-link': 'no_navegar',
        },

        initialize: function (rutas) {
            rutas.on('route',function(e){
            });
            var user_link = new UserLinkView({
                model:UserModel
            })
            var mini_carro = new MiniCarro({
                model:CarroModel
            });
        },
        navegar:function(e){
            e.preventDefault();
            var link = e.currentTarget.pathname;
            Backbone.history.navigate(link, {trigger:true});
        },
        no_navegar:function (e) {
            e.preventDefault();
        }
    });

    return AppView;
});
/*
define([
    'jquery',
    'underscore',
    'backbone',
    'routes/app',
    'carro',
    'views/mini_carro'
], function ($, _, Backbone,Rutas,CarroModel,CarroMini) {
    'use strict';

    var AppView = Backbone.View.extend({
        el:$('body'),
        className: '',

        events: {
            'click .link': 'navegar',
            'click .no-link': 'no_navegar',
        },

        initialize: function () {
            var mini = new CarroMini({model:CarroModel});
        },
        navegar:function(e){
            e.preventDefault();
            var link = e.currentTarget.pathname;
            Rutas.navigate(link, {trigger:true});
        },
        no_navegar:function (e) {
            e.preventDefault();
        }
    });

    return AppView;
});
*/