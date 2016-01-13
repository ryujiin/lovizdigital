/*global define*/

define([
    'underscore',
    'backbone',
    '../models/direccion'
], function (_, Backbone, DireccionModel) {
    'use strict';

    var DireccionCollection = Backbone.Collection.extend({
        model: DireccionModel,
        url: '/api/cliente/direcciones/',
    });    
    return DireccionCollection;
});
