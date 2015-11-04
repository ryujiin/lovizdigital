/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig'
], function ($, _, Backbone, swig) {
    'use strict';

    var BreadcrumbLinkView = Backbone.View.extend({

        template: swig.compile($('#breadcrumb_link_tlp').html()),        


        tagName: 'li',

        id: '',

        className: '',

        events: {},

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
        }
    });

    return BreadcrumbLinkView;
});
