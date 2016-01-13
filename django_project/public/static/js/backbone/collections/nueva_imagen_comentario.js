/*global define*/

define([
    'underscore',
    'backbone',
    '../models/nueva_imagen_comentario'
], function (_, Backbone, ImagenModel) {
    'use strict';

    var ImagenCollection = Backbone.Collection.extend({
        url: '/api/comentarioimgs/',
        
        model: ImagenModel,
    });

    return ImagenCollection;
});
