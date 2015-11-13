define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
    '../../views/catalogo/productoLista'
], function ($, _, Backbone, swig, ProductoLista) {
    'use strict';

    var CatalogoListView = Backbone.View.extend({
        
        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function () {
        	debugger;
        },
        render:function () {
            this.collection.forEach(this.addOne,this)
        },
        addOne:function (modelo) {
        	var vista = new ProductoLista({
        		model:modelo
        	})
        	this.$('#catalgo_list').append(vista.$el);
        }
    });
    
    return CatalogoListView
});