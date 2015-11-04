/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
    'carro'
], function ($, _, Backbone, swig,CarroModel) {
    'use strict';

    var AddToCartView = Backbone.View.extend({
    
        template: swig.compile($('#add_to_cart_tlp').html()),        

        tagName: 'form',

        id: '',

        className: 'addtocart',

        events: {
            'click #addtocart':'verificar_compra',
        },

        initialize: function () {
            this.render();
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
        },
        verificar_compra:function () {

            var modeloCarro = CarroModel;
            var self = this;
            var carro = this.model.toJSON().carro;
            if (carro) {
                this.comprar();
            }else{
                modeloCarro.save().done(function(data){
                    $.localStorage.set({carro:data.id});
                    self.model.set({carro:data.id});
                    self.comprar();
                });
            }
        },
        comprar:function () {
            var datos = this.model;
            if (CarroModel.id) {
                this.model.set({cantidad:1});
                this.model.save().done(function (data) {
                    CarroModel.fetch();
                });
            };
        }
    });

    return AddToCartView;
});
