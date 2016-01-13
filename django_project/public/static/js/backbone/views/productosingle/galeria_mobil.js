/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
    'owl'
], function ($, _, Backbone, swig,Owl) {
    'use strict';

    var GaleriaMobilView = Backbone.View.extend({

        template: swig.compile($('#galeria_mobil_tlp').html()),

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function () {
            this.render();
            this.poner_galeria();
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
        },
        poner_galeria:function () {
            this.$el.owlCarousel({
                navigation : true, // Show next and prev buttons
                slideSpeed : 300,
                paginationSpeed : 400,
                singleItem:true
            });
        }
    });

    return GaleriaMobilView;
});
