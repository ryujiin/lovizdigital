/*global define*/

define([
    'underscore',
    'backbone',
    '../models/metodo_envio'
], function (_, Backbone, MetodoEnvioModel) {
    'use strict';

    var MetodoEnvioCollection = Backbone.Collection.extend({
        model: MetodoEnvioModel,
        url: '/api/metodos_envio/',
    });    
    return MetodoEnvioCollection;
});
