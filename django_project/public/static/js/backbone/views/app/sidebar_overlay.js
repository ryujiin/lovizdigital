/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    '../../routers/rutas'
], function ($, _, Backbone,Rutas) {
    'use strict';

    var SidebarOverlayView = Backbone.View.extend({
        tagName: 'div',
        className: 'sidebar-overlay',

        events: {
            'click':'borrarse',
        },

        initialize: function () {
            var self = this;
            Rutas.on('route',function(e){
                self.borrarse();
            });
        },
        borrarse:function(){
            this.$el.fadeOut('fast');
            $("#menu-link-user li a").addClass('mostrar');
            $('#nav-sidebar-user').removeClass('show');
            this.remove();

        }
    });

    return SidebarOverlayView;
});
