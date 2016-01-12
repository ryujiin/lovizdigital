/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
    'carro',
    '../../models/user',
    '../../models/pedido',
    '../../views/procesar/paso_metodoenvio',
    '../../views/procesar/paso_identificar',
    '../../collections/direcciones',
    '../../views/procesar/paso_pago',    
    '../../views/procesar/resumen',        
], function ($, _, Backbone, swig,CarroModel,UserModel,PedidoModel,PasoEnvio,PasoIdentificar,DireccionesCollection,PasoPago,Resumen) {
    'use strict';

    var PageProcesarCompraView = Backbone.View.extend({
        el:$('#contenido'),
        template: swig.compile($('#procesar_page_tlp').html()),

        tagName: 'div',

        id: '',

        className: '',

        events: {
        },

        initialize: function () {
        },

        render: function () {
            this.$el.html(this.template());
            this.crear_paso_identificar()
            this.crear_paso_envio();
            this.crear_paso_pago();
            this.crear_resumen();
            this.ver_paso_actual();
        },
        verificar_render:function () {
            var self = this;
            if (CarroModel.toJSON().lineas) {
                self.objtener_model();
            }else{
                Backbone.history.navigate("/", {trigger: true});                    
            }
        },
        objtener_model:function () {
            var self = this;
            var pedido_id = CarroModel.toJSON().pedido;
            if (pedido_id) {
                this.model.id= pedido_id;
                this.model.fetch().done(function () {
                    self.render();
                })
            }else{
                this.render();
            }
        },
        crear_paso_identificar:function () {

            this.paso_identificar = new PasoIdentificar({
                el:this.$('.paso_identificar'),
                model:this.model,
            })
        },
        crear_paso_envio:function () {
            var direcciones = new DireccionesCollection();
            this.paso_envio = new PasoEnvio({
                el:this.$('.paso_envio'),
                collection: direcciones,
                model:this.model,
            });
        },
        crear_paso_pago:function () {
            debugger;
            this.paso_pago = new PasoPago({
                el:this.$('.paso_pago'),
                model:this.model,
            });
        },
        crear_resumen:function () {
            var carro = CarroModel;
            this.resumen = new Resumen({
                el:this.$('.orden_sumary'),
                model:CarroModel,
            });
        },
        ver_paso_actual:function () {
            if (this.model.id===undefined) {
                this.model.set('paso_actual',1)
            }else if (this.model.toJSON().estado_pedido==='autenticado'){
                this.model.set('paso_actual',2)
            }else if (this.model.toJSON().estado_pedido==='metodo_envio') {
                this.model.set('paso_actual',3)
            };
        },
    });
    var page = new PageProcesarCompraView({
        model: new PedidoModel()
    });

    return page
});