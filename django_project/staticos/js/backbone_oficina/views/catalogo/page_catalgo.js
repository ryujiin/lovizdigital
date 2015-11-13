define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
    '../../collections/producto',
    '../../views/catalogo/catalogolist'
], function ($, _, Backbone, swig,ProductoCollection,CatalogoList) {
    'use strict';

    var PageCatalogoView = Backbone.View.extend({
        el:$('#content'),
        template: swig.compile($('#page_catalogo_oficna').html()),        

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function () {
        },
        render:function () {
            this.$el.html(this.template());
            this.addCatalogoList();
        },
        addCatalogoList:function () {
            var collection = new ProductoCollection();
            var catalogolist = new CatalogoList({
                el:this.$('#lista_productos'),
                collection:collection,
            });
            collection.fetch().done(function () {
                catalogolist.render();
            })
        }
    });

    var vista = new PageCatalogoView();

    return vista;
});