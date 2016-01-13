/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig'
], function ($, _, Backbone, swig) {
    'use strict';

    var ProgrecionBarView = Backbone.View.extend({
        template: swig.compile($('#bloque_ajax_tlp').html()),                

        tagName: 'div',

        id: '',

        className: 'progrecionBar',

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