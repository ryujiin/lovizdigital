/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
], function ($, _, Backbone, swig,zoom) {
    'use strict';

    var EstrellasView = Backbone.View.extend({

        tagName: 'div',

        id: '',

        className: '',

        events: {
        },

        initialize: function () {
        },

        render: function (num) {
            this.$el.empty();
            var valor = num
            var estre = '<span class="estrella icon-star"></span>'
            var estre_activo = '<span class="estrella icon-star activo"></span>'
            for (var i = 0 ; i < 5; i++) {
                if (valor<=i) {
                    this.$el.append(estre);
                }else{
                    this.$el.append(estre_activo);                    
                }
            };
        },
    });

    return EstrellasView;
});
