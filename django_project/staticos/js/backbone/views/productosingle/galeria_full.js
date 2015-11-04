/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
    'zoom'
], function ($, _, Backbone, swig,zoom) {
    'use strict';

    var GaleriaFullView = Backbone.View.extend({

        template: swig.compile($('#galeriafull_tlp').html()),

        tagName: 'div',

        id: '',

        className: '',

        events: {
            'click .product-thumbnails img':'cambiar_zoom',
        },

        initialize: function () {
            this.render();
            this.poner_zoom();
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
        },
        poner_zoom:function () {
            this.$('#imagen_primary').zoom();
        },
        cambiar_zoom:function (e) {
            e.preventDefault();
            var url = e.target.dataset.imagen;
            this.$('#imagen_primary').trigger('zoom.destroy');
            this.$('#imagen_primary').empty();
            var img = '<img src="'+url+'" alt="">';
            this.$('#imagen_primary').html(img);
            this.poner_zoom();
        }
    });

    return GaleriaFullView;
});
