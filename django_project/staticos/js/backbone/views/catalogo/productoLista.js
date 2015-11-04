/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig'
], function ($, _, Backbone, swig) {
    'use strict';

    var ProductosListaView = Backbone.View.extend({

        template: swig.compile($('#productosLista_tlp').html()),                

        tagName: 'article',

        id: '',

        className: 'productos col-md-4',

        events: {},

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'change:visible', this.visibilidad);
            this.render();
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
        },
        visibilidad: function () {
            if (this.model.toJSON().visible===false) {
                this.$el.fadeOut();
            }else{
                this.$el.fadeIn();
            }
        }
    });

    return ProductosListaView;
});
