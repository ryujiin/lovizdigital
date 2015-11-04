/*global define*/

define([
    'underscore',
    'backbone',
    '../models/ubigeo'
], function (_, Backbone, UbigeoModel) {
    'use strict';

    var UbigeoCollection = Backbone.Collection.extend({
        url: '/api/ubigeo/',
        
        model: UbigeoModel,
    });

    return UbigeoCollection;
});
