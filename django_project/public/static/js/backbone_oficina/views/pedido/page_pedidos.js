define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
], function ($, _, Backbone, swig) {
    'use strict';

    var PagePedidosView = Backbone.View.extend({
        el:$('#content'),
        template: swig.compile($('#pedidos_oficna_tlp').html()),        

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

    var vista = new PagePedidosView();

    return vista;
});