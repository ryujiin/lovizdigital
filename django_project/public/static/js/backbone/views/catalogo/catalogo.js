define(["jquery","underscore","backbone","../../collections/productos","productosTotal","../../views/catalogo/productoLista","../../views/app/bloque_ajax","../../collections/catalogo/filtros"],function(o,t,i,e,c,l,n,r){"use strict";var s=i.View.extend({id:"",className:"",collection:new e,events:{},initialize:function(){this.listenTo(r,"add",this.filtrar),this.listenTo(r,"remove",this.filtrar)},render:function(){this.collection.forEach(this.addOne,this);var o=c;o.add([this.collection])},addOne:function(o){o.set({visible:!0});var t=new l({model:o});this.$el.append(t.$el),t.$el.addClass("col-md-4 col-sm-6 col-xs-6")},buscar_productos:function(t){var i=this,e=new n;this.collection.fetch({data:o.param({categoria:t})}).always(function(){i.render(),i.ver_filtros(),e.remove()})},ver_filtros:function(){r.length>0&&this.filtrar()},filtrar:function(){var o=r;if(o.length>0){this.collection.forEach(function(o){o.set("visible",!1)});var t=this;o.forEach(function(o){"color"===o.toJSON().tipo&&t.filtrar_color(o.toJSON().valor)})}else this.collection.forEach(function(o){o.set("visible",!0)})},filtrar_color:function(o){this.collection.where({color:o}).forEach(function(o){o.set("visible",!0)})}});return s});