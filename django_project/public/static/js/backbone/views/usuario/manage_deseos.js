
define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
], function ($, _, Backbone, swig) {
    'use strict';

    var UserFormLoginView = Backbone.View.extend({

        template: swig.compile($('#usuario_lista_deseos_tpl').html()),        

        id: '',
        className: '',
        events: {
        },
        initialize: function () {
            this.render();
            debugger;
            
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
        },
    });

    return UserFormLoginView;
});
