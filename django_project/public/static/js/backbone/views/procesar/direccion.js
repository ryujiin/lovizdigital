/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig'
], function ($, _, Backbone, swig) {
    'use strict';

    var DireccionView = Backbone.View.extend({

        template: swig.compile($('#direccion_tlp').html()),                

        tagName: 'div',

        id: '',

        className: 'lista-direccion',

        events: {},

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
        },
    });

    return DireccionView;
});
