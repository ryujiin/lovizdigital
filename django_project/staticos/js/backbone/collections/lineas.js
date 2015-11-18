/*global define*/

define([
    'underscore',
    'backbone',
    '../models/linea'
], function (_, Backbone, LineaModel) {
    'use strict';

    var LineaCollection = Backbone.Collection.extend({
        url: '/api/carro/lineas/',
        
        model: LineaModel,
    });

    return LineaCollection;
});
