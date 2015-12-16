define([
    'jquery',
    'underscore',
    'backbone',
    'swig'
], function ($, _, Backbone, swig) {
    'use strict';

    var ProgrecionBarView = Backbone.View.extend({
        template: swig.compile($('#loader_min').html()),                

        tagName: 'div',

        id: '',

        className: 'ajax_full',

        events: {},

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.html(this.template());
            $('body').append(this.$el);
            this.$el.fadeIn('fast');
        },
    });

    return ProgrecionBarView;
});