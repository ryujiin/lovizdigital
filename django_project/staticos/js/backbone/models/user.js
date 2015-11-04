/*global define*/

define([
    'underscore',
    'backbone',
    'storage',
    '../views/app/bloque_ajax'
], function (_, Backbone,storage,Bloque_ajax) {
    'use strict';

    var UserModel = Backbone.Model.extend({
        url: '/api/user/perfil/',

        initialize: function() {
            this.buscar_user();
            //this.listenTo(this, 'change', this.buscar_user);
        },
        defaults: {
            fristname:'Anonimo',
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        },
        buscar_user:function(){
            this.fetch().done(function (data) {
            })
            /*
            var self = this;
            var token = this.toJSON().token;
            if (token.length!==0) {
                this.fetch({
                    headers:{
                        'Authorization':token
                    }
                }).done(function(){
                    localStorage.token_user = token;
                }).fail(function(){
                    localStorage.removeItem('token_user');
                    self.set('token', '');
                })  
            };
            */
        },
        logout_user:function(){
            localStorage.removeItem('token_user');
            window.location="/";
        },
        ingresar_user:function (email,pass,vista) {
            var self = this;
            var progrecion_bar = new Bloque_ajax();
            //http://apiloviz.herokuapp.com/api-token-auth/
            $.post("/login/",
                {username: email,password:pass})
            .done(function(data){
                if (data.id!==0) {
                    self.buscar_user();
                    Backbone.history.navigate('/usuario/perfil/', {trigger:true})
                }else{
                    vista.error_login();                       
                }                
            }).fail(function(data){
                vista.error_login();                    
            }).always(function(){
                progrecion_bar.remove();
            });
            /*
            $.post("http://localhost:8000/api-token-auth/",
                {username: email,password:pass})
            .done(function(data){
                self.set('token','JWT '+data.token);            
                Backbone.history.navigate('/usuario/perfil/', {trigger:true})
            }).fail(function(data){
                vista.error_login();                    
            }).always(function(){
                progrecion_bar.remove();
            });/*/
        },
        crear_user:function (email,pass,nombre,apellido,vista) {
            var self = this;
            var progrecion_bar = new ProgrecionBar();
            self.email = email;
            self.pass = pass;
            $.post('http://localhost:8000/ajax/crear/',{username:email,password:pass,nombre:nombre,apellido:apellido})
            .done(function (data) {
                if (data.creado===true) {
                    self.ingresar_user(self.email,self.pass);
                };
            }).fail(function (data) {
                vista.error_crear()
            }).always(function(){
                progrecion_bar.remove();
            });
        }
    });

    var usermodel = new UserModel();
    /*
    var token = localStorage.token_user;
    if (token!==undefined) {
        usermodel.set('token' , token);
    };
    */

    return usermodel;
});
