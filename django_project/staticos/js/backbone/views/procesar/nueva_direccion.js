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
            'click .add_direccion label':'mostrar_formulario',
            'change #departamentos':'add_provincias',
            'change #provincias':'add_distritos',
            'submit #form_nueva_direccion':'verificar_inputs',
        },

        initialize: function () {
            this.model = new DireccionModel();
            this.render();
        },

        render: function () {
            this.$el.html(this.template());
            this.add_departamentos();
        },
        add_departamentos:function () {
            var self = this
            var ubigeos = new Ubigeos();
            ubigeos.fetch().done(function () {
                ubigeos.forEach(self.addOneDepa,self)
            })
        },
        addOneDepa:function (modelo) {
            var datos = modelo.toJSON();
            var option = "<option value="+datos.id+" data-nombre="+datos.name+">"+datos.name+"</option>";
            this.$('#departamentos').append(option);
        },
        add_provincias:function () {
            var self = this;
            var parent = this.$('#departamentos').val();
            var ubigeos = new Ubigeos();
            ubigeos.fetch({
                data:$.param({region:parent})
            }).done(function () {
                ubigeos.forEach(self.addOneProvi,self)
            })
        },
        addOneProvi:function (modelo) {
            var datos = modelo.toJSON();
            var option = "<option value="+datos.id+" data-nombre="+datos.name+">"+datos.name+"</option>";            
            this.$('#provincias').append(option);
        },
        add_distritos:function () {
            var self = this;
            var parent = this.$('#provincias').val();
            var ubigeos = new Ubigeos();
            ubigeos.fetch({
                data:$.param({region:parent})
            }).done(function () {
                ubigeos.forEach(self.addOneDistri,self)
            })
        },
        addOneDistri:function (modelo) {
            var datos = modelo.toJSON();
            var option = "<option value="+datos.id+" data-nombre="+datos.name+">"+datos.name+"</option>";            
            this.$('#distritos').append(option);            
        },
        verificar_inputs:function (e) {
            var self = this;
            e.preventDefault();
            this.$('input').each(function (e,i) {
                var dato = self.ver_campo(i);
                if (dato===false) {
                    return false
                };
            })
            this.$('select').each(function (e,i) {
                var dato = self.ver_campo(i);
                if (dato===false) {
                    return false
                };
            })
            this.crear_nueva_direccion();
        },
        ver_campo:function (i) {
            var conte = $('.'+i.dataset.contenedor);
            var valor = i.value;
            if (valor==='') {
                conte.addClass('error')
                return false
            }else{
                conte.removeClass('error')
                return true
            }
        },
        crear_nueva_direccion:function () {
            var user = UserModel.id;
            var nombre = this.$('.f_nombre input').val();
            var depa = this.$('.f_depas select option:selected').data('nombre')
            var provi = this.$('.f_provi select option:selected').data('nombre')
            var distrito = this.$('.f_distri select option:selected').data('nombre')
            var ubigeo = this.$('.f_distri select').val();
            var direccion = this.$('.direcciones input').val();
            if (user && nombre && depa && provi && distrito && ubigeo && direccion) {
                this.model.set({
                    "nombre": nombre,
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
                this.model.save().done(function (data) {
                    debugger;
                });
            };
            
        }
    });

    return PasoMetodoEnvioView;
});