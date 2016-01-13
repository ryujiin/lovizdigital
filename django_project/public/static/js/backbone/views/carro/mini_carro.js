/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
], function ($, _, Backbone, swig) {
    'use strict';

    var MiniCarroView = Backbone.View.extend({
        el:$(".mini-cart"),
        template: swig.compile($('#mini_carro_template').html()),

        tagName: 'div',

        id: '',

        className: '',

        events: {
            'click':'navegar_carro',
        },

        initialize: function () {
            this.render()
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
        },
        navegar_carro:function(){
            Backbone.history.navigate('/carro/', {trigger:true});
        }
    });

    return MiniCarroView;
});
