/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
    'carro',
    '../../views/app/loader_full',
    '../../views/productosingle/minicompra',    
], function ($, _, Backbone, swig,CarroModel,LoaderFull,MiniCompra) {
    'use strict';

    var AddToCartView = Backbone.View.extend({
    
        template: swig.compile($('#add_to_cart_tlp').html()),        

        tagName: 'form',

        id: '',

        className: 'addtocart',

        events: {
        },

        initialize: function () {
            this.render();
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
        },
        verificar_compra:function (vista) {
            var modeloCarro = CarroModel;
            var self = this;
            var carro = this.model.toJSON().carro;

            if (carro) {
                this.comprar(vista);
            }else{
                modeloCarro.save().done(function(data){
                    $.localStorage.set({carro:data.id});
                    self.model.set({carro:data.id});
                    self.comprar(vista);
                });
            }
        },
        comprar:function (vista) {
            var self = this;
            var loader = new LoaderFull();
            var datos = this.model;
            if (CarroModel.id) {
                this.model.set({cantidad:1});
                this.model.save().done(function (data) { 
                    self.crearMinicompra();
                    vista.render();
                    loader.remove();                    
                    CarroModel.fetch();
                });
            };
        },
        crearMinicompra:function () {
            var minicompra = new MiniCompra({
                model:this.model,
                el:$('#mini_compra')
            })
            minicompra.mostrar();
        }

    });

    return AddToCartView;
});
