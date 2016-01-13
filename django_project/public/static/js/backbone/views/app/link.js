/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig'
], function ($, _, Backbone,swig) {
    'use strict';

    var SidebarOverlayView = Backbone.View.extend({
        
        template: swig.compile($('#option').html()),        

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

    return SidebarOverlayView;
});