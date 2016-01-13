/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
    '../../collections/lineas',
    '../../views/carro/lineas_linea'  
], function ($, _, Backbone, swig,LineasCollection,LineasViews) {
    'use strict';

    var PageCarroLineasView = Backbone.View.extend({
        
        template: swig.compile($('#lineas_carro_tlp').html()),

        tagName: 'div',

        id: '',

        className: 'carro_lineas',

        events: {},

        initialize: function () {
            this.collection = new LineasCollection();            
            this.listenTo(this.model, 'change', this.verificar_numero);
            //this.listenTo(this.collection, 'add', this.addLinea);
            this.render();            
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            this.verificar_numero();
        },
        buscar_lineas : function () {
            var self = this;            
            this.collection.fetch({
                data:$.param({carro:this.model.id})
            }).done(function () {
                self.addLineas();
            })
        },
        verificar_numero:function () {
            var self=this;
            if (this.model.toJSON().lineas===0) {
                this.$el.hide();
            }else{
                this.$el.show();
                this.buscar_lineas();
            }
        },
        addLinea:function (modelo) {
            if (modelo.toJSON().cantidad!==0) {
                var coincidencias = this.collection.where({id:modelo.id});
                if (coincidencias.length!==0) {
                    var vista = new LineasViews({model:modelo});
                    this.$('.lineas_items').append(vista.$el)    
                };
            };            
        },
        addLineas:function () {
            this.$('.lineas_items').empty();
            this.collection.forEach(this.addLinea,this);
        }
    });

    return PageCarroLineasView;
});
