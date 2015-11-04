/*global define*/
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
    '../../views/app/breadcrumb'
], function ($, _, Backbone, swig,CarroModel,CarroTitulo,PageLineas,CarroTotal,BotonCheckout,BreadViews) {
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
        },
        addBread:function () {
            this.breadVista = new BreadViews({el:$('.nav-breadcrumb')});

            this.breadVista.collection.add([
                {nombre:'Home', link:'/'},
                {nombre:'Carro',},
            ]);
            this.breadVista.render();
        }
    });

    var vista = new CarroPageView();

    return vista;
});

/*
define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/page_carro_titulo',
    'views/page_carro_lineas',
    'views/page_carro_total',
    'views/page_carro_boton_checkout',
    'views/breadcrumb',

], function ($, _, Backbone, JST,PageTitulo,PageLineas,CarroTotal,BotonCheckout,BreadViews) {
    'use strict';

    var CarroPageView = Backbone.View.extend({
        el:$('#contenido'),

        template: JST['app/scripts/templates/carro_page.hbs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function () {
            this.titulo = new PageTitulo({model:this.model});            
            this.lineas_carro = new PageLineas({model:this.model});       
            this.total_carro = new CarroTotal({model:this.model});       
            this.botoncheckout = new BotonCheckout({model:this.model});       
        },

        render: function () {
            this.$el.html(this.template());
            this.$('.titulo').append(this.titulo.$el);
            this.$('.lineas_carro').append(this.lineas_carro.$el)
            this.$('.total_carro').append(this.total_carro.$el)
            this.$('.boton_checkout').append(this.botoncheckout.$el)
            this.addBread();            
        },
        addBread: function(){
            this.breadVista = new BreadViews({el:$('.nav-breadcrumb')});
            this.breadVista.collection.reset();

            this.breadVista.collection.add([
                {nombre:'Home', link:'/'},
                {nombre:'Carro',},
            ]);

            this.breadVista.render();
        }
    });

    return CarroPageView;
});
*/