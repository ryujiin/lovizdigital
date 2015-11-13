define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
], function ($, _, Backbone, swig) {
    'use strict';

    var PageResumenView = Backbone.View.extend({
        el:$('#content'),
        template: swig.compile($('#resumen_oficina_tlp').html()),        

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

    var vista = new PageResumenView();

    return vista;
});