/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
    'owl',
], function ($, _, Backbone, swig) {
    'use strict';

    var BloqueView = Backbone.View.extend({

        id: '',

        className: '',

        events: {},

        initialize: function () {
            this.get_template();
            this.render();
        },

        render: function () {
            this.$el.html(this.template(this.model));
            this.agregar_DOM();
            if (this.model.carrusel===true) {
                this.add_Carrusel();
            };
        },
        get_template:function () {
            this.template = swig.compile($(this.model.template).html());               
        },
        agregar_DOM:function () {
            $(this.model.seccion).append(this.$el);
        },
        add_Carrusel:function () {
            this.$el.owlCarousel({
                navigation : true, // Show next and prev buttons
                slideSpeed : 300,
                paginationSpeed : 400,
                singleItem:true
            });
        }
    });

    return BloqueView;
});
