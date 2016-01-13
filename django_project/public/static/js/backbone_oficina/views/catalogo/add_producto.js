define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
], function ($, _, Backbone, swig) {
    'use strict';

    var Add_productoView = Backbone.View.extend({
        el:$('#content'),
        template: swig.compile($('#add_producto_tlp').html()),        

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function () {
        },
        render:function () {
            this.$el.html(this.template());
        },
    });

    return Add_productoView;
});