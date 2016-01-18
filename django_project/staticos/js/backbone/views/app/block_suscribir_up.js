/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig'
], function ($, _, Backbone, swig) {
    'use strict';

    var ProgrecionBarView = Backbone.View.extend({
        template: swig.compile($('#bloque_suscribir_up_tmp').html()),                

        tagName: 'div',

        id: '',

        className: 'bloque_sus_up',

        events: {
            'click .cerrar':'cerrar',
            'submit form':'enviar',
        },

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.html(this.template());
        },
        aparecer:function () {
            this.$el.slideDown(1000)
        },
        cerrar:function () {
            this.$el.slideUp(600)
        },
        enviar:function (e) {
            e.preventDefault();
            var self = this;
            var valor = this.$('.email').val();
            this.model.set({
                email:valor,
            })
            this.model.save().always(function (data) {
                self.$el.html('<h1 class="text-center">¡Gracias por suscribirse!</h1>');
                self.$el.delay(1000).slideUp(500)
            })
        }
    });

    return ProgrecionBarView;
});