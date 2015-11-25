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
        },

        render: function () {
            var paso = this.model.toJSON().paso_actual;            
            this.$el.html(this.template(this.model.toJSON()));
            this.add_forms();
            if (paso === 1) {
                this.$el.addClass('is-activo');
            };
        },
        add_forms:function () {
            var login = new FormLogin({
                el:this.$('.login_form')
            })
            var crear = new FormCrear({
                el:this.$('.crear_user')
            });
        }
    });

    return PasoIdentificarView;
});