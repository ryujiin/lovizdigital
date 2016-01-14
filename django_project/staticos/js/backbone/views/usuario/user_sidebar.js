/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
    '../usuario/user_formLogin',
    '../usuario/user_formCrear',
], function ($, _, Backbone, swig,UserFormLogin,UserFormCrear) {
    'use strict';

    var UserSidebarView = Backbone.View.extend({
        el:$('#nav-sidebar-user'),

        template: swig.compile($('#user_sidebar_template').html()),        

        tagName: 'div',

        id: '',

        className: '',

        events: {
            'click .login-box':'obtener_activo',
        },

        initialize: function () {
            this.render();
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template());
            if (this.model.toJSON().email!==undefined) {
                this.$el.hide();
            };
            var formlogin = new UserFormLogin({
                el:$('#dwfrm_login'),
                model:this.model
            });
            var formcrear = new UserFormCrear({
                el:$('#crear_login_sidebar'),
                model:this.model
            })

        },
        ver_activo:function(activado){
            this.$('.section-header').removeClass('active')
            this.$('.login-box-content').removeClass('active')

            if (activado==='login') {
                this.$('.login-account .section-header').addClass('active')
                this.$('.login-account .login-box-content').addClass('active')
            }else if (activado === 'registro'){
                this.$('.login-create-account .section-header').addClass('active')
                this.$('.login-create-account .login-box-content').addClass('active')
            }
        },
        obtener_activo:function(e){
            var activo = e.currentTarget.dataset.activo;
            this.ver_activo(activo);
        }
    });

    return UserSidebarView;
});
