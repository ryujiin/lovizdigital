/*global define*/

define([
    'underscore',
    'backbone',
    '../../models/catalogo/filtro'
], function (_, Backbone, FiltroModel) {
    'use strict';

    var FiltroCollection = Backbone.Collection.extend({
        model: FiltroModel
    });

    var filtros = new FiltroCollection();

    return filtros;
});
