define(["jquery","underscore","backbone","swig","../views/app/header"],function(e,a,n,t,i){"use strict";var o=n.View.extend({el:e("#contenido"),template:t.compile(e("#page_home_template").html()),id:"",className:"",events:{},initialize:function(){},render:function(){this.$el.html(this.template()),this.cambiar_header()},cambiar_header:function(){var e="Loviz DelCarpio® | Donde encontras los mejores pantuflas, sandalias y calzado.",a="Loviz DelCarpio® Boutique , Encontraras lo mejor en pantuflas, sandalias, botas, flats y demas. Envio Gratis para todo el peru por compras mayores a S/.50.00",n=i;n.render(e,a)}}),r=new o;return r});