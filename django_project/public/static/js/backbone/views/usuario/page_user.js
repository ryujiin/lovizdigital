define(["jquery","underscore","backbone","swig","../../views/app/breadcrumb","../../models/user","../../views/app/header","../../views/usuario/manage_cuenta","../../views/usuario/manage_direcciones","../../views/usuario/manage_pedidos","../../views/usuario/manage_deseos"],function(e,i,a,s,o,t,d,n,r,l,u){"use strict";var c=a.View.extend({el:e("#contenido"),template:s.compile(e("#page_user_tlp").html()),tagName:"div",id:"",events:{},initialize:function(){},render:function(){this.$el.html(this.template(this.model.toJSON())),this.$el.removeClass(),this.addBread(),this.change_head(),this.crear_modales()},addBread:function(){this.breadVista=new o({el:e(".nav-breadcrumb")}),this.breadVista.collection.reset(),this.breadVista.collection.add([{nombre:"Home",link:"/"},{nombre:"Mi cuenta",link:null}]),this.breadVista.render()},change_head:function(){var e="Mi cuenta | Loviz DelCarpio® :: LovizDC, lovizdc.com",i="El area de usuario en Loviz DC",a=d;a.render(e,i)},crear_modales:function(){new n({el:this.$("#usuario_edit"),model:this.model}),new r({el:this.$("#usuario_direcciones"),model:this.model}),new l({el:this.$("#usuario_pedidos"),model:this.model}),new u({el:this.$("#usuario_lista_deseos"),model:this.model})}}),m=new c({model:t});return m});