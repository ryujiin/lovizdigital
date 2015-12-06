/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
    '../../collections/lineas',    
    '../../views/procesar/linea_resumen',    
], function ($, _, Backbone, swig,LineasCollection,LineasResumen) {
    'use strict';

    var ResumenView = Backbone.View.extend({

        template: swig.compile($('#resumen_tlp').html()), 

        tagName: 'div',

        id: '',

        className: '',

        events: {
        },

        initialize: function () {
            this.render();
            this.listenTo(this.model, 'change', this.render);                        
        },

        render: function () {
            
            this.$el.html(this.template(this.model.toJSON()));

            this.addLineas();
        },
        addLineas:function () {
            var self = this;
            var lineas_modelo = new LineasCollection();
            lineas_modelo.fetch({
                data:$.param({carro:this.model.id})
            }).done(function () {
                lineas_modelo.forEach(self.addLinea,self)
            })
        },
        addLinea:function (modelo) {
            var linea = new LineasResumen({
                model:modelo
            });
            this.$('.lienas_resumen').append(linea.$el);
        }
    });

    return ResumenView;
});