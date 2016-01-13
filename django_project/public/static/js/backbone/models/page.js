/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var PageModel = Backbone.Model.extend({

        urlRoot : '/api/cmsweb/pages/',
        
        url: function(){
            var base = this.urlRoot;
            return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.id+'/';
        },

        initialize: function() {
        },

        defaults: {
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

    return PageModel;
});
