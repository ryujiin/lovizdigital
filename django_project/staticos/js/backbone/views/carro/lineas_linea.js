/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
    'carro',
], function ($, _, Backbone, swig,CarroModel) {
    'use strict';

    var PageCarroLineasLineaView = Backbone.View.extend({
        //template: JST['app/scripts/templates/page_carro_lineas_linea.hbs'],
        template: swig.compile($('#lineas_linea_tlp').html()),        

        tagName: 'article',

        id: '',

        className: 'linea',

        events: {
            'click .mas_produ .icono':'aumentar_producto',
            'click .menos_produ .icono':'menos_producto',
            'click .eliminar':'eliminar',
        },

        initialize: function () {
            this.render();
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
        },
        aumentar_producto:function () {
            var self = this;
            var cantidad = this.model.toJSON().cantidad;
            this.model.set('cantidad',cantidad+1);
            this.model.save().done(function () {
                CarroModel.fetch();
            });
        },
        menos_producto:function () {
            var self=this;
            var cantidad = this.model.toJSON().cantidad;
            this.model.set('cantidad',cantidad-1)
            this.model.save().done(function () {
                CarroModel.fetch()
                if (self.model.toJSON().cantidad===0) {
                    self.remove();
                };            
            });
        },
        eliminar:function () {
            this.model.set('cantidad',0)
            this.model.save().done(function () {
                CarroModel.fetch()
            })
        },
        efecto:function () {
        }
    });

    return PageCarroLineasLineaView;
});
