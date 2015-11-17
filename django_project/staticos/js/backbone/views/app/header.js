define([
    'jquery',
    'underscore',
    'backbone',
    'swig'
], function ($, _, Backbone, swig) {
    'use strict';

    var HeaderView = Backbone.View.extend({

        el:$('head'),

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function () {
        },

        render: function (titulo,descripcion) {
            this.$('title').empty().append(titulo);
            this.$('meta[name=description]').remove();
            this.$el.append('<meta name="description" content="'+descripcion+'">')
        },
    });

    var header = new HeaderView();

    return header;
});