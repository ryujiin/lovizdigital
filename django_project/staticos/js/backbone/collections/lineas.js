/*global define*/

define([
    'underscore',
    'backbone',
    '../models/linea'
], function (_, Backbone, LineaModel) {
    'use strict';

    var LineaCollection = Backbone.Collection.extend({
        url: 'http://localhost:8000/api/carro/lineas/',
        
        model: LineaModel,
    });

    return LineaCollection;
});
