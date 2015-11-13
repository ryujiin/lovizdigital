/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
], function ($, _, Backbone) {
    'use strict';

    var AppView = Backbone.View.extend({
        el:$('body'),
        className: '',

        events: {
            'click .link': 'navegar',
            'click .no-link': 'no_navegar',
        },

        initialize: function () {
        },
        navegar:function(e){
            e.preventDefault();
            var link = e.currentTarget.pathname;
            Backbone.history.navigate(link, {trigger:true});
        },
        nos_navegar:function (e) {
            e.preventDefault();
        }
    });

    return AppView;
});