/*global define*/

define([
    'underscore',
    'backbone',
    '../models/user',
    'storage',
    'coockie'
], function (_, Backbone,UserModel,Storage,coockie) {
    'use strict';

    var CarroModel = Backbone.Model.extend({
        
        urlRoot : '/api/carro/',
        
        url: function(){
            var base = this.urlRoot;
            if (this.isNew()) return base;
            return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.id+'/';
        },

        initialize: function() {
            this.listenTo(UserModel, "change", this.buscar_carrologin, this);
            this.buscar_carro();
        },

        defaults: {
            "propietario": null,
            "estado": "Abierto",
            "sesion_carro": '',
            "lineas": 0,
            "total": "0.00",
            "subtotal": "0.00",
            "envio": 0
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        },
        buscar_carrologin:function () {
            
            var self = this;
            //condicional si existe carro con login facebook
            var facebook = $.localStorage.get('facebook');            
            $.localStorage.remove('facebook');
            if (UserModel.id) {            
                if (facebook ===true) {
                    var carro = $.localStorage.get('carro');                    
                    this.fetch({
                        data:$.param({c_f:carro})
                    }).done(function (data) {
                        self.set({propietario:UserModel.id});
                        self.save()
                    })                    
                }else{
                    this.fetch().done(function(data){            
                        
                        if (data.propietario===null) {
                            self.set({propietario:UserModel.id});
                            self.save().done(function(data){
                            });
                        }else{
                        }
                    }).fail(function(){
                        self.set({propietario:UserModel.id});                        
                    })
                }
            }
        },
        buscar_carro:function () {
            var self = this;
            if (UserModel.id) {
                
                this.buscar_carrologin();
            }else{
                var galleta = this.get_session();
                this.fetch({
                    data:$.param({session:galleta})
                });
            }
        },
        get_session:function () {
            var session = $.localStorage.get('session');
            if (session) {
                this.set({sesion_carro:session})
            }else{
                session = this.obt_galleta();
                this.set({sesion_carro:session})
            }
            return session;
        },
        obt_galleta : function(){
            var galleta = $.localStorage.get('session');
            if (galleta==null) {
                console.log('veamos');
                var session = getRandomChar();
                $.localStorage.set({session:session});
                galleta = session;
            };
            function getRandomChar() {
                var numCara = 50
                var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
                var pass ='';
                var i,x;
                for (i=0;i<numCara;i++) {
                    x = Math.floor(Math.random()*62);
                    pass+=chars.charAt(x);
                };
                return pass
            };
            return galleta
        },
    });

    return CarroModel;
});