/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    '../../views/procesar/metodo_envio'
], function ($, _, Backbone,Metodo) {
    'use strict';

    var DireccionesView = Backbone.View.extend({

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function () {
            this.listenTo(this.collection, 'add', this.addMetodo);
            this.render();
        },

        render: function () {
            var self = this;
            this.collection.fetch();
        },
        addMetodo:function (modelo) {     
            var metodo = new Metodo({model:modelo});
            this.$el.append(metodo.$el);
        },
    });

    return DireccionesView;
});