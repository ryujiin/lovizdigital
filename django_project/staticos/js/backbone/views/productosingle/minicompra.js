/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
], function ($, _, Backbone, swig) {
    'use strict';

    var MiniCompraView = Backbone.View.extend({

        template: swig.compile($('#mini_compra_tlp').html()),                        

        tagName: 'div',

        id: '',

        className: '',

        events: {
        },

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
        },
        mostrar:function () {
            debugger;
            this.$el.modal('show');
            debugger;
        }
    });

    return MiniCompraView;
});
