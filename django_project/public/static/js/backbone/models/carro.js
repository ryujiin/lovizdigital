define(["underscore","backbone","../models/user","storage","coockie"],function(t,o,i){"use strict";var r=o.Model.extend({urlRoot:"/api/carro/",url:function(){var t=this.urlRoot;return this.isNew()?t:t+("/"==t.charAt(t.length-1)?"":"/")+this.id+"/"},initialize:function(){this.listenTo(i,"change",this.buscar_carrologin,this),this.buscar_carro()},defaults:{propietario:null,estado:"Abierto",sesion_carro:"",lineas:0,total:"0.00",subtotal:"0.00",envio:0},validate:function(){},parse:function(t){return t},buscar_carrologin:function(){var t=this;i.id&&this.fetch().done(function(o){null===o.propietario&&(t.set({propietario:i.id}),t.save().done(function(){}))}).fail(function(){t.set({propietario:i.id})})},buscar_carro:function(){if(i.id)this.buscar_carrologin();else{var t=this.get_session();this.fetch({data:$.param({session:t})})}},get_session:function(){var t=$.localStorage.get("session");return t?this.set({sesion_carro:t}):(t=this.obt_galleta(),this.set({sesion_carro:t})),t},obt_galleta:function(){function t(){var t,o,i=50,r="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",e="";for(t=0;i>t;t++)o=Math.floor(62*Math.random()),e+=r.charAt(o);return e}var o=$.localStorage.get("session");if(null==o){console.log("veamos");var i=t();$.localStorage.set({session:i}),o=i}return o}});return r});