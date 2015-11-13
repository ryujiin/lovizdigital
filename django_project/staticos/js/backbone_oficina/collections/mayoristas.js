/*global define*/

define([
    'underscore',
    'backbone',
    '../models/mayorista'
], function (_, Backbone, MayoristaModel) {
    'use strict';

    var MayoristasCollection = Backbone.Collection.extend({
        model: MayoristaModel,
        url: '/api/oficina/mayoristas/',
    });
    
    return MayoristasCollection;
});
