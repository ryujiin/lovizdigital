/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
    'carro',
    '../../models/user',
    '../../collections/pedidos',
    '../../views/procesar/paso_metodoenvio',
    '../../collections/direcciones',
    '../../views/procesar/paso_pago',    
    '../../views/procesar/resumen',        
], function ($, _, Backbone, swig,CarroModel,UserModel,PedidosCollections,PasoEnvio,DireccionesCollection,PasoPago,Resumen) {
    'use strict';

    var PageProcesarCompraView = Backbone.View.extend({
        el:$('#contenido'),
        template: swig.compile($('#procesar_page_tlp').html()),

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function () {
        },

        render: function () {
            this.$el.html(this.template());
            this.crear_paso_envio();
            this.crear_paso_pago();
            this.crear_resumen();
        },
        verificar_render:function () {
            var self = this;
            if (UserModel.id===undefined) {
                Backbone.history.navigate("ingresar/", {trigger: true});
            }else{
                if (CarroModel.toJSON().lineas) {
                    if (this.collection.length===0) {
                        this.collection.fetch().done(function () {                     
                            self.objtener_model();
                        })
                    }else{
                        self.objtener_model();
                    }
                }else{
                    Backbone.history.navigate("/", {trigger: true});                    
                }
            }  
        },
        objtener_model:function () {
            var pedido_id = CarroModel.toJSON().pedido;
            var modelo = this.collection.findWhere({id:pedido_id});
            if (modelo) {
                this.model = modelo
                this.render();
            }else{
                Backbone.history.navigate('/',{trigger: true})
            }
        },
        crear_paso_envio:function () {
            var direcciones = DireccionesCollection;
            var paso_envio = new PasoEnvio({
                el:this.$('.paso_envio'),
                collection:direcciones,
                model:this.model,
            });
            direcciones.fetch().done(function (data) {
                paso_envio.ver_render();
            });
        },
        crear_paso_pago:function () {
            var paso_pago = new PasoPago({
                el:this.$('.paso_pago'),
                model:CarroModel,
            });
        },
        crear_resumen:function () {
            var carro = CarroModel;
            var resumen = new Resumen({
                el:this.$('.orden_sumary'),
                model:CarroModel,
            });
        }
    });
    var page = new PageProcesarCompraView({
        collection : PedidosCollections
    });

    return page
});