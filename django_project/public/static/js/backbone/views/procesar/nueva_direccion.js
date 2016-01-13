/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'swig',
    '../../collections/ubigeos',
    '../../models/direccion',
    '../../models/user'
], function ($, _, Backbone, swig,Ubigeos,DireccionModel,UserModel) {
    'use strict';

    var PasoMetodoEnvioView = Backbone.View.extend({

        template: swig.compile($('#nueva_direccion_tlp').html()), 

        tagName: 'div',

        id: '',

        className: '',

        events: {
            'change #departamentos':'add_provincias',
            'change #provincias':'add_distritos',
            'submit #form_nueva_direccion':'verificar_inputs',
            'blur input':'get_datos',
            'blur select':'get_datos',
        },

        initialize: function () {
            this.direccion = new DireccionModel();
            this.render();
        },

        render: function () {
            this.$el.html(this.template());
            this.add_departamentos();
        },
        add_departamentos:function () {
            var self = this;
            var ubigeos = new Ubigeos();
            ubigeos.fetch().done(function () {
                ubigeos.forEach(self.addOneDepa,self)
            })
        },
        addOneDepa:function (modelo) {
            var datos = modelo.toJSON();
            var option = "<option value='"+datos.id+"' data-nombre='"+datos.name+"'>"+datos.name+"</option>";          
            this.$('#departamentos').append(option);
        },
        add_provincias:function () {
            var self = this;
            var parent = this.$('#departamentos').val();
            this.$('#provincias').empty();
            var ubigeos = new Ubigeos();
            ubigeos.fetch({
                data:$.param({region:parent})
            }).done(function () {
                ubigeos.forEach(self.addOneProvi,self)
            })
        },
        addOneProvi:function (modelo) {
            var datos = modelo.toJSON();
            var option = "<option value='"+datos.id+"' data-nombre='"+datos.name+"'>"+datos.name+"</option>";          
            this.$('#provincias').append(option);
        },
        add_distritos:function () {
            var self = this;
            var parent = this.$('#provincias').val();
            this.$('#distritos').empty();            
            var ubigeos = new Ubigeos();
            ubigeos.fetch({
                data:$.param({region:parent})
            }).done(function () {
                ubigeos.forEach(self.addOneDistri,self)
            })
        },
        addOneDistri:function (modelo) {
            var datos = modelo.toJSON();
            var option = "<option value='"+datos.id+"' data-nombre='"+datos.name+"'>"+datos.name+"</option>";          
            this.$('#distritos').append(option);            
        },
        get_datos:function (e) {
            var valor = e.target.value;
            var contenedor = '.'+e.target.dataset.contenedor;
            var validar_vacio = this.validar_vacio(valor,contenedor);
            if (validar_vacio) {
                if (contenedor==='.campo_correo') {
                    this.validar_email(valor,contenedor);
                };
            };
        },
        validar_vacio:function (valor,contenedor) {
            var error_contenedor = this.$(contenedor +' .error');
            error_contenedor.empty();
            if (valor==='') {
                this.$(contenedor).addClass('has-error').removeClass('has-success');
                error_contenedor.append('<p class="text-danger">Este campo es Requerido *</p>');
                return false;
            }else{
                this.$(contenedor).addClass('has-success').removeClass('has-error');                
                return true;
            }      
        },
        verificar_inputs:function (e) {
            var self = this;
            e.preventDefault();
            this.$('input').each(function (e,i) {
                var conte = '.'+i.dataset.contenedor;
                var campo = self.validar_vacio(i.value,conte);
                if (campo===false) {                    
                    return false
                };
            })
            this.$('select').each(function (e,i) {
                var conte = '.'+i.dataset.contenedor;
                var campo = self.validar_vacio(i.value,conte);
                if (campo===false) {                    
                    return false
                };
            })
            this.crear_nueva_direccion();
        },
        crear_nueva_direccion:function () {
            self = this;
            var user = UserModel.id;
            var depa = this.$('.f_depas select option:selected').data('nombre')
            var provi = this.$('.f_provi select option:selected').data('nombre')
            var distrito = this.$('.f_distri select option:selected').data('nombre')
            var ubigeo = this.$('.f_distri select').val();
            var direccion = this.$('.direcciones input').val();
            if (user && depa && provi && distrito && ubigeo && direccion) {
                this.direccion.set({
                    "tipo": null,
                    "departamento": depa,
                    "provincia": provi,
                    "distrito": distrito,
                    "direccion": direccion,
                    "referencia": "",
                    "codigo_postal": "",
                    "telefono": "",
                    "usuario": user,
                    "ubigeo": ubigeo
                })

                this.direccion.save().done(function (data) {
                    self.collection.add(self.direccion);
                    $('.form_addDirec').slideUp();
                    $('.metodo_envio_form').slideDown();
                    self.model.set('direccion_envio',data.id);
                });
            };
            
        }
    });

    return PasoMetodoEnvioView;
});