/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
    '../../views/app/header',
], function ($, _, Backbone, swig,Head) {
    'use strict';

    var ErrorPageView = Backbone.View.extend({
        el:$('#contenido'),

        template: swig.compile($('#page_error_template').html()),        

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function () {
        },

        render: function () {
            this.$el.html(this.template());          
            this.change_head();
            this.finalizo();
        },
        change_head:function () {
            var titulo = 'Opps No se encontro lo que buscabas, | Loviz DelCarpio® :: lovizdc.com';
            var descripcion = 'Ups no se encontro lo que buscabas, nuestro error.';
            var header = Head;
            header.render(titulo,descripcion);
        },
        finalizo:function () {
            window.prerenderReady = true;
        }

    });

    var vista = new ErrorPageView();

    return vista;
});