define(["jquery","underscore","backbone","../../collections/productos","productosTotal","../../views/catalogo/productoLista"],function(e,t,o,i,c,n){"use strict";var s=o.View.extend({id:"",className:"",collection:new i,events:{},initialize:function(){},render:function(){this.collection.forEach(this.addOne,this);var e=c;e.add([this.collection])},addOne:function(e){e.set({visible:!0});var t=new n({model:e});t.$el.addClass("col-xs-6 col-sm-3 col-md-3"),this.$el.append(t.$el)},buscar_productos:function(){var t=this;this.collection.fetch({data:e.param({categoria:this.slug,limite:4})}).always(function(){t.render()})}});return s});