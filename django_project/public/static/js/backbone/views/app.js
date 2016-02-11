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
    '../views/app/bloque_suscrito',
    '../models/suscrito',
    '../views/app/block_suscribir_up',

], function ($, _, Backbone,UserModel,MenuCollection,UserLinkView,CarroModel,MiniCarro,Menu,BloqueSuscrito,ModelSuscrito,BloqueSusUP) {
    'use strict';

    var AppView = Backbone.View.extend({
        el:$('body'),
        className: '',

        events: {
            'click .link': 'navegar',
            'click .no-link': 'no_navegar',
            'click .menu-mobil-icono': 'mostrar_navegador_mobil',
            'click .btn-facebook':'salvar_carro',
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
            this.addBloqueSuscrito();
            this.addbloque_sus_up();
        },
        navegar:function(e){
            e.preventDefault();
            var link = e.currentTarget.pathname;
            Backbone.history.navigate(link, {trigger:true});
            $('#navigation').removeClass('is_activo');
            $('body').animate({scrollTop:0}, 'slow');
        },
        no_navegar:function (e) {
            e.preventDefault();
        },
        mostrar_navegador_mobil:function (e) {
            $('#navigation').toggleClass('is_activo');
        },
        addBloqueSuscrito:function () {
            var bloque_suscrito = new BloqueSuscrito({
                el:$('#suscribirse'),
                model:new ModelSuscrito(),
            })
        },
        addMenus:function () {
            var self = this;
            var menus = new MenuCollection();
            menus.fetch().done(function (data) {
                menus.forEach(function (menu) {
                    var vista = new Menu({
                        model:menu
                    });
                    vista.render();
                });
            })
        },
        salvar_carro:function (e) {
            e.preventDefault();
            if (CarroModel.toJSON().lineas>0) {
                $.localStorage.set('facebook',true);
                if (Backbone.history.fragment==='procesar-compra/') {
                    $.localStorage.set('pagina_procesar',true);
                };
                window.location.href="/login/facebook/";
            }else{
                window.location.href="/login/facebook/";
            }   
        },
        addbloque_sus_up:function () {
            var bloqueup = new BloqueSusUP({
                model:new ModelSuscrito(),
            });
            this.$el.append(bloqueup.$el);
            bloqueup.aparecer();
        }

    });

    return AppView;
});