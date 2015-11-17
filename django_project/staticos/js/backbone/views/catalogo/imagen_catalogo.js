/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
], function ($, _, Backbone, swig) {
    'use strict';

    var TituloCatalogoView = Backbone.View.extend({

        template: swig.compile($('#imagen_catalogo_tlp').html()),        

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function () {
            this.render();
        },
        render:function () {
            this.$el.html(this.template(this.model.toJSON()));
        },
    });

    return TituloCatalogoView;
});