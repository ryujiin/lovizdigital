/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
    '../usuario/user_sidebar',
    '../app/sidebar_overlay',
], function ($, _, Backbone, swig,UserSidebar,SideBarOverlay) {
    'use strict';

    var UserLinksView = Backbone.View.extend({
        el:$("#menu-link-user"),
        
        template: swig.compile($('#user_links_template').html()),        

        id: '',
        className: '',
        events: {
            'click .mostrar' : 'mostrar_menu_user',
            'click .salir': 'logout_user',
            'click .ingresar_user': 'visible_login',
            'click .unirme_user': 'visible_register',
        },
        initialize: function () {
            this.user_sidebar = new UserSidebar({model:this.model});

            this.listenTo(this.model, 'change', this.render);
            this.render();
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
        },
        mostrar_menu_user:function(e){
            e.preventDefault();
            this.$(".mostrar").removeClass('mostrar');
            $('#nav-sidebar-user').addClass('show');
            var sidebar = new SideBarOverlay();
            $('body').append(sidebar.$el);
            sidebar.$el.fadeIn('fast');
        },
        logout_user:function(e){
            e.preventDefault();
            this.model.logout_user();
        },
        visible_register:function(){
            this.user_sidebar.ver_activo('registro');
        },
        visible_login:function(){
            this.user_sidebar.ver_activo('login');
        }
    });

    return UserLinksView;
});
