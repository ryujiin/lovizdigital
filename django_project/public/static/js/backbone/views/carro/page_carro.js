/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
    'carro',
    '../../views/carro/page_carro_titulo',
    '../../views/carro/lineas_carro',
    '../../views/carro/carro_total',
    '../../views/carro/boton_checkout',
    '../../views/app/breadcrumb',
    '../../views/app/header',
], function ($, _, Backbone, swig,CarroModel,CarroTitulo,PageLineas,CarroTotal,BotonCheckout,BreadViews,Head) {
    'use strict';

    var CarroPageView = Backbone.View.extend({
        el:$('#contenido'),

        template: swig.compile($('#page_carro_template').html()),        

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function () {
            this.titulo = new CarroTitulo({model:CarroModel});        
            this.lineas_carro = new PageLineas({model:CarroModel});       
            this.total_carro = new CarroTotal({model:CarroModel}); 
            this.botoncheckout = new BotonCheckout({model:CarroModel});
        },

        render: function () {
            this.$el.html(this.template());
            this.$('.titulo').html(this.titulo.$el);
            this.$('.lineas_carro').html(this.lineas_carro.$el);
            this.$('.total_carro').html(this.total_carro.$el);
            this.$('.boton_checkout').html(this.botoncheckout.$el);
            this.addBread();                        
            this.change_head();    
            this.finaizo();
        },
        addBread:function () {
            this.breadVista = new BreadViews({el:$('.nav-breadcrumb')});

            this.breadVista.collection.add([
                {nombre:'Home', link:'/'},
                {nombre:'Carro',},
            ]);
            this.breadVista.render();
        },
        change_head:function () {
            var titulo = 'Mi carro de compras | Loviz DelCarpio® :: lovizdc.com';
            var descripcion = 'Mi carro de compras en Loviz DelCarpio®, lovizdc.com';
            var header = Head;
            header.render(titulo,descripcion);
        },
        finaizo:function () {
            window.prerenderReady = true;
            //enviar pagina a google analitycs
            var dimensionValue = 'cart';                   
            ga('set', 'dimension2', dimensionValue);
            window.prerenderReady = true;
        }

    });

    var vista = new CarroPageView();

    return vista;
});
