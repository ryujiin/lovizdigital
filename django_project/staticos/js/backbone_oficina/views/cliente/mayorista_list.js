define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
], function ($, _, Backbone, swig) {
    'use strict';

    var MayoristaPanelView = Backbone.View.extend({

        template: swig.compile($('#mayorista_lista').html()),        

        tagName: 'tr',

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

    return MayoristaPanelView;
});