define(["jquery","underscore","backbone","swig","../../views/productosingle/estrellas"],function(e,i,t,s,l){"use strict";var n=t.View.extend({template:s.compile(e("#productosLista_tlp").html()),tagName:"article",id:"",className:"productos",events:{},initialize:function(){this.listenTo(this.model,"change",this.render),this.listenTo(this.model,"change:visible",this.visibilidad),this.render()},render:function(){this.$el.html(this.template(this.model.toJSON()));var e=new l({el:this.$(".estrellas")});e.render(this.model.toJSON().valoracion)},visibilidad:function(){this.model.toJSON().visible===!1?this.$el.hide():this.$el.show()}});return n});