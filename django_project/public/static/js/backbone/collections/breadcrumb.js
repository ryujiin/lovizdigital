/*global define*/

define([
    'underscore',
    'backbone',
    '../models/breadcrumb'
], function (_, Backbone, BreadcrumbModel) {
    'use strict';

    var BreadcrumbCollection = Backbone.Collection.extend({
        model: BreadcrumbModel
    });

    return BreadcrumbCollection;
});
