/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
], function ($, _, Backbone, swig) {
    'use strict';

    var NuevaImagenComentView = Backbone.View.extend({

        template: swig.compile($('#nueva_imagen_tlp').html()),

        tagName: 'div',

        id: '',

        className: 'imagen_coment',

        events: {
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);            
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
        },
    });

    return NuevaImagenComentView;
});
