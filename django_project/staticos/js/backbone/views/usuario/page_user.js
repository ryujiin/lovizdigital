/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
    '../../views/app/breadcrumb',
    '../../models/user',
    '../../views/app/header',
    '../../views/usuario/manage_cuenta',
    '../../views/usuario/manage_direcciones',
    '../../views/usuario/manage_pedidos',    
    '../../views/usuario/manage_deseos',    
], function ($, _, Backbone, swig,BreadView,UserModel,Head,ManageCuenta,ManageDirecciones,ManagePedidos,ManageDeseos) {
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
            this.crear_modales();
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
        },
        crear_modales:function () {
            var manage_cuenta = new ManageCuenta({
                el:this.$('#usuario_edit'),
                model:this.model
            });
            var manage_direccciones = new ManageDirecciones({
                el:this.$('#usuario_direcciones'),
                model:this.model
            });
            var manage_pedidos = new ManagePedidos({
                el:this.$('#usuario_pedidos'),
                model:this.model
            });
            var manage_lista_deseos = new ManageDeseos({
                el:this.$('#usuario_lista_deseos'),
                model:this.model
            })
        }
    });
    var page = new PageUserView({model:UserModel})

    return page;
});
