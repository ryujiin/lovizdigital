/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
    '../../views/app/breadcrumb',
    '../../models/user',
    '../../views/app/header'
], function ($, _, Backbone, swig,BreadView,UserModel,Head) {
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
            this.addBread();
            this.change_head();
        },
        addBread: function(){
            this.breadVista = new BreadView({el:$('.nav-breadcrumb')});
            this.breadVista.collection.reset();

            this.breadVista.collection.add([
                {nombre:'Home', link:'/'},
                {nombre:'Mi cuenta', link:null}
            ]);
            this.breadVista.render();
        },
        change_head:function () {
            var titulo = 'Mi cuenta | Loviz DelCarpio® :: LovizDC, lovizdc.com';
            var descripcion = "El area de usuario en Loviz DC";
            var header = Head;
            header.render(titulo,descripcion);
        }
    });
    var page = new PageUserView({model:UserModel})

    return page;
});
