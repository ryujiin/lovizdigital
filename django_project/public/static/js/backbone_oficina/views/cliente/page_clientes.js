define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
    '../../collections/mayoristas',
    '../../views/cliente/mayoristas_panel',
], function ($, _, Backbone, swig,MayoristaCollection ,MayoristaPanel) {
    'use strict';

    var PageClienteViews = Backbone.View.extend({
        el:$('#content'),
        template: swig.compile($('#cliente_oficina_tlp').html()),        

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function () {
        },
        render:function () {
            this.$el.html(this.template());
            this.add_paneles();
        },
        add_paneles:function () {
            var mayoristas_collection = new MayoristaCollection()
            var panel_mayorista = new MayoristaPanel({
                el:this.$('.mayorista_panel'),
                collection:mayoristas_collection,
            })
        }
    });

    var vista = new PageClienteViews();

    return vista;
});