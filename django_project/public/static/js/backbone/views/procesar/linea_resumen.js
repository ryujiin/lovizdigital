/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig'
], function ($, _, Backbone, swig) {
    'use strict';

    var LineasResumenView = Backbone.View.extend({

        template: swig.compile($('#linea_resumen_tlp').html()),        

        tagName: 'article',

        id: '',

        className: 'linea panel_seccion',

        events: {
        },

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
        },
    });

    return LineasResumenView;
});
