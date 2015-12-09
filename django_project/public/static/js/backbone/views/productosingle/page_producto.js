define(["jquery","underscore","backbone","swig","../../models/productos","../../collections/productos","../../collections/comentarios","productosTotal","../../views/app/breadcrumb","../../views/productosingle/galeria_full","../../views/productosingle/galeria_mobil","../../views/productosingle/add_to_cart","../../models/linea","../../views/productosingle/relacionados","../../views/productosingle/estrellas","../../views/productosingle/seccion_comentarios","../../views/productosingle/nuevo_comentario","../../views/app/header","../../models/comentario","carro"],function(e,o,i,t,a,l,s,r,n,d,c,m,h,u,_,v,p,g,b,w){"use strict";var f=i.View.extend({el:e("#contenido"),template:t.compile(e("#productoSingles_tlp").html()),tagName:"div",id:"",className:"",collection:new l,events:{"change .tallas_form":"cambiar_talla"},initialize:function(){this.listenTo(this.model,"change",this.render)},render:function(){this.$el.html(this.template(this.model.toJSON())),this.change_header(),this.add_bread(),this.add_galleria(),this.add_button_cart(),this.add_relacionados(),this.add_estrellas(),this.add_lista_comentarios()},change_header:function(){var e=this.model.toJSON().full_name+" | Loviz DelCarpio® :: lovizdc.com",o=this.model.toJSON().descripcion,i=g;i.render(e,o)},cambiar_producto:function(o){var i=r,t=this,a=i.findWhere({slug:o});a?this.model.set(a.toJSON()):this.collection.fetch({data:e.param({slug:o})}).done(function(e){i.add(this.collection),t.model.set(e[0])})},add_bread:function(){this.breadVista=new n({el:e(".nav-breadcrumb")}),this.breadVista.collection.reset();var o=this.model.toJSON(),i={nombre:"Home",link:"/"};this.breadVista.collection.add(i);var t=this.model.toJSON().categorias;t&&(t.forEach(this.agregar_bread,this),i={nombre:o.nombre,link:null},this.breadVista.collection.add(i),this.breadVista.render())},agregar_bread:function(e){var o={nombre:e.nombre,link:e.link};this.breadVista.collection.add(o)},add_galleria:function(){new d({model:this.model,el:e(this.$("#galeria_full"))}),new c({model:this.model,el:e(this.$("#galeria_movil"))})},cambiar_talla:function(e){var o=e.target.value;this.$(".precios .precio_variacion.mostrar").removeClass("mostrar"),this.$(".precios .precio_variacion."+o).addClass("mostrar"),this.lineamodel.set({variacion:o})},add_button_cart:function(){this.lineamodel=new h({producto:this.model.id,carro:w.id});new m({model:this.lineamodel,el:this.$("#addtocart")})},add_relacionados:function(){var e,o=new u({el:this.$("#producto-asociado .lista-productos")}),i=this.model.toJSON().categorias;i.forEach(function(o){"categoria"===o.seccion&&(e=o.slug)}),o.buscar_productos(e)},add_estrellas:function(){var e=new _({el:this.$(".estrellas"),model:this.model});e.render(this.model.toJSON().valoracion)},add_lista_comentarios:function(){{var e=new s;new v({el:this.$("#recomendation-producto"),model:this.model,collection:e}),new p({el:this.$("#nuevo_comentario"),model:new b,collection:e})}}}),N=new a;return new f({model:N})});