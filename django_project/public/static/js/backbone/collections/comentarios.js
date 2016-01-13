/*global define*/

define([
    'underscore',
    'backbone',
    '../models/comentario'
], function (_, Backbone, ComentarioModel) {
    'use strict';

    var ComentarioCollection = Backbone.Collection.extend({
        model: ComentarioModel,
        url: '/api/comentarios/',
        buscar_producto : function (id) {
        	this.fetch({
        		data:$.param({producto:id})
        	})
        }
    });

    return ComentarioCollection;
});
