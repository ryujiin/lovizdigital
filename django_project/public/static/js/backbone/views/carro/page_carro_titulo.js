/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig'
], function ($, _, Backbone, swig) {
    'use strict';

    var PageCarroTituloView = Backbone.View.extend({

        template: swig.compile($('#carro_titulo_tlp').html()),        

        tagName: 'div',
        
        id: '',

        className: '',

        events: {},

        initialize: function () {
            this.render();
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
        }
    });

    return PageCarroTituloView;
});
