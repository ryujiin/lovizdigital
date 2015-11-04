/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
    '../../views/app/breadcrumb',
    '../../models/user'
], function ($, _, Backbone, swig,BreadView,UserModel) {
    'use strict';

    var PageUserView = Backbone.View.extend({
        el:$('#contenido'),
        template: swig.compile($('#page_user_tlp').html()),

        tagName: 'div',

        id: '',

        events: {},

        initialize: function () {
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            this.$el.removeClass();
            this.$el.addClass('pt_account Account-Show account-welcome container');
            this.addBread();
        },
        addBread: function(){
            this.breadVista = new BreadView({el:$('.nav-breadcrumb')});
            this.breadVista.collection.reset();

            this.breadVista.collection.add([
                {nombre:'Home', link:'/'},
                {nombre:'Mi cuenta', link:null}
            ]);
            this.breadVista.render();
        }
    });
    var page = new PageUserView({model:UserModel})

    return page;
});
