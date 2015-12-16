/*global define*/

define([
    'underscore',
    'backbone',
    '../models/page'
], function (_, Backbone, PageModel) {
    'use strict';

    var PagesCollection = Backbone.Collection.extend({
        url: '/api/cmsweb/pages/',
        
        model: PageModel,
    });

    return PagesCollection;
});
