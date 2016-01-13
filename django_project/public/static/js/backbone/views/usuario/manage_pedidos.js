
define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
], function ($, _, Backbone, swig) {
    'use strict';

    var UserFormLoginView = Backbone.View.extend({

        template: swig.compile($('#usuario_pedidos_tpl').html()),        

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
    });

    return UserFormLoginView;
});
