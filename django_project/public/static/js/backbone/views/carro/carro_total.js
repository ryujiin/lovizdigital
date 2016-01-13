/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig'
], function ($, _, Backbone, swig) {
    'use strict';

    var PageCarroTituloView = Backbone.View.extend({
        template: swig.compile($('#carro_total_tlp').html()),

        tagName: 'table',

        id: '',

        className: '',

        events: {},

        initialize: function () {
            this.render();
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            if (this.model.toJSON().lineas===0) {
                this.$el.hide();
            }else{
                this.$el.show();
            }
        }
    });

    return PageCarroTituloView;
});
