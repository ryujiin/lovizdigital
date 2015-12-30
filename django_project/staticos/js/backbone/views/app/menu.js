define([
    'jquery',
    'underscore',
    'backbone',
    'swig'
], function ($, _, Backbone, swig) {
    'use strict';

    var MenuView = Backbone.View.extend({
        template: swig.compile($('#menu_template').html()),                

        tagName: 'div',

        id: '',

        className: '',

        events: {
            'click h4':'mostrar_links',
        },

        initialize: function () {            
            this.render();
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            this.addtoDOM();
            this.addlinks();
        },
        addtoDOM:function () {
            var contenedor = '#'+this.model.toJSON().seccion;
            $(contenedor).append(this.$el);
        },
        addlinks:function () {
            var self = this;
            this.model.toJSON().links.forEach(function (link) {
                var link = '<li><a href="'+link.link+'">'+link.nombre+'</a></li>';
                self.$('ul').append(link);
            })
        },
        mostrar_links:function () {
            this.$('ul').toggleClass('activo');
        }

    });

    return MenuView;
});