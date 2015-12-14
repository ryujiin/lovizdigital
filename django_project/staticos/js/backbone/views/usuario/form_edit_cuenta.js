/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
    '../../models/user',    
], function ($, _, Backbone, swig,UserModel) {
    'use strict';

    var UserFormLoginView = Backbone.View.extend({

        template: swig.compile($('#usuario_edit_tpl').html()),        

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
