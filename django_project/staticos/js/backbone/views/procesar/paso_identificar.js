/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
    '../../views/usuario/user_formLogin',
    '../../views/usuario/user_formCrear'
], function ($, _, Backbone, swig,FormLogin,FormCrear) {
    'use strict';

    var PasoIdentificarView = Backbone.View.extend({

        template: swig.compile($('#paso_identificar_tlp').html()), 

        tagName: 'div',

        id: '',

        className: '',

        events: {
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);            
            this.render();
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            var paso = this.model.toJSON().paso_actual;
            if (paso === 1) {
                this.add_forms();
                this.$el.addClass('is-activo');
            }
            if (paso>1) {
                this.$el.addClass('is-guardado').removeClass('is-activo');
            };
        },
        add_forms:function () {
            var login = new FormLogin({
                el:this.$('.login_form'),
                model:this.model,
            })
            var crear = new FormCrear({
                el:this.$('.crear_user'),
                model:this.model
            });
        },
    });

    return PasoIdentificarView;
});