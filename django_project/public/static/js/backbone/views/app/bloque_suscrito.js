/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig'
], function ($, _, Backbone, swig) {
    'use strict';

    var SuscritoView = Backbone.View.extend({

        tagName: 'div',

        id: '',

        className: '',

        events: {
            'submit #submit_form_email':'validar_email'
        },

        initialize: function () {
        },

        render: function () {
        },
        validar_email:function (e) {
            var self = this;
            e.preventDefault();
            var valor = this.$('input[type=email]').val();
            var respuesta = '<p class="bg-success" >Gracias por suscribirte</p>'

            this.model.set({
                email:valor,
            })
            this.model.save().always(function (data) {
                self.$('#submit_form_email').hide();
                self.$("#submit_email_wrapper").append(respuesta);
            })
        }
    });

    return SuscritoView;
});