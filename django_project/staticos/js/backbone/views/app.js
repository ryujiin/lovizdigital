/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    '../models/user',
    '../collections/menus',
    '../views/usuario/user_links',
    'carro',
    '../views/carro/mini_carro',
    '../views/app/menu',
], function ($, _, Backbone,UserModel,MenuCollection,UserLinkView,CarroModel,MiniCarro,Menu) {
    'use strict';

    var AppView = Backbone.View.extend({
        el:$('body'),
        className: '',

        events: {
            'click .link': 'navegar',
            'click .no-link': 'no_navegar',
            'click .menu-mobil-icono': 'mostrar_navegador_mobil',
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
            this.addMenus();
        },
        navegar:function(e){
            e.preventDefault();
            var link = e.currentTarget.pathname;
            Backbone.history.navigate(link, {trigger:true});
            $('#navigation').removeClass('is_activo');
        },
        no_navegar:function (e) {
            e.preventDefault();
        },
        mostrar_navegador_mobil:function (e) {
            $('#navigation').toggleClass('is_activo');
        },
        addMenus:function () {
            var self = this;
            var menus = new MenuCollection();
            menus.fetch().done(function (data) {
                menus.forEach(function (menu) {
                    var vista = new Menu({
                        model:menu
                    });
                });
            })
        },

    });

    return AppView;
});