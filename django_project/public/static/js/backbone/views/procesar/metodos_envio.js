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
            this.collection.fetch().done(function (data) {
                if (data[0].grupo==0) {
                    var texto = '<h4>Felicidades tienes envio ¡GRATIS!</h4>';
                }else{
                    var texto = '<h5>que pena tu pedido no alcanza para el envio gratis</h5><p>Almenos sigue siendo mas barato que ir en bus :D</p>';
                }
                $('.metodo_envio_form .texto_informativo').append(texto);
            });
        },
        addMetodo:function (modelo) {     
            var metodo = new Metodo({model:modelo});
            this.$el.append(metodo.$el);
        },
    });

    return DireccionesView;
});