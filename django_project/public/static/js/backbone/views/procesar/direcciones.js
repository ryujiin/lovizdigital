/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    '../../views/procesar/direccion'
], function ($, _, Backbone,Direccion) {
    'use strict';

    var DireccionesView = Backbone.View.extend({

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function () {
            this.render();
        },

        render: function () {
            var self = this;
            this.collection.fetch().done(function () {
                if (self.collection.length>0) {
                    self.$('.text-warning').hide();
                    self.collection.forEach(self.addDirec,self);
                };
                self.listenTo(self.collection, 'add', self.addDirecSelec);
            });
        },
        verificar_numero:function () {
            var self = this;            
        },
        addDirec:function (modelo) {     
            var direccion = new Direccion({model:modelo});
            this.$el.append(direccion.$el);
        },
        addDirecSelec:function (modelo) {
            this.$('.text-warning').hide();
            var direccion = new Direccion({model:modelo});
            this.$el.append(direccion.$el);
            direccion.$('input').prop('checked', true);
        }
    });

    return DireccionesView;
});