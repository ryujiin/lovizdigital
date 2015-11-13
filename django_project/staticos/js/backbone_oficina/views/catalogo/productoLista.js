/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig'
], function ($, _, Backbone, swig) {
    'use strict';

    var ProductosListaView = Backbone.View.extend({

        template: swig.compile($('#producto_list_tlp').html()),                

        tagName: 'tr',

        id: '',

        className: 'productos',

        events: {},

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
        },
    });

    return ProductosListaView;
});
