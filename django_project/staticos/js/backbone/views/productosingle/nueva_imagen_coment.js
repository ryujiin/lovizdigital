/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
    '../../models/nueva_imagen_comentario'
], function ($, _, Backbone, swig,ImagenModel) {
    'use strict';

    var NuevaImagenComentView = Backbone.View.extend({

        template: swig.compile($('#nueva_imagen_tlp').html()),

        tagName: 'div',

        id: '',

        model:new ImagenModel(),

        className: 'imagen',

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
