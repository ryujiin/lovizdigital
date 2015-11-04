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
            this.verificar_numero();
        },

        render: function () {
            this.$el.empty();
            this.collection.forEach(this.addDirec,this);
        },
        verificar_numero:function () {
            if (this.collection.length!==0) {
                this.render();
            };
        },
        addDirec:function (modelo) {     
            var direccion = new Direccion({model:modelo});
            this.$el.append(direccion.$el);
        }
    });

    return DireccionesView;
});