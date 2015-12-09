define(["jquery","underscore","backbone","swig","../../models/user","../../views/productosingle/nueva_imagen_coment","../../collections/nueva_imagen_comentario","../../models/nueva_imagen_comentario"],function(e,t,o,a,n,r,i,s){"use strict";var l=o.View.extend({template:a.compile(e("#form_nuevo_coment_tlp").html()),tagName:"div",id:"",className:"",events:{"mouseenter .estrellas_form button":"encima_estrellas","mouseleave .estrellas_form button":"salir_estrellas","click .estrellas_form button":"click_estrella","blur #titulo_coment":"verificar_titulo","blur #coment_content":"verificar_cant_content","keypress #coment_content":"contando_num","click .recomendacion":"recomendacion_valor","click .enviar_comentario":"enviar_comentario","change #foto_comentario":"subio_imagen"},initialize:function(){this.imagenes=new i,this.render()},render:function(){this.$(".formulario").html(this.template(this.model.toJSON())),this.ver_user()},ver_user:function(){var e=n;void 0!==e.toJSON().id?(this.$(".autenticar_user").hide(),this.model.set("usuario",e.id)):this.model.set("usuario",null);var t=this.$("#producto_id_coment").val();this.model.set("producto",t)},encima_estrellas:function(e){for(var t=e.target.dataset.valor,o=e.target.dataset.texto,a=1;5>=a;a++)t>=a?this.$(".estrellas_form button."+a).addClass("hover"):this.$(".estrellas_form button."+a).removeClass("hover");this.$(".form_estrellas .texto").html(o)},salir_estrellas:function(){this.$(".estrellas_form button").removeClass("hover")},click_estrella:function(e){for(var t=e.target.dataset.valor,o=1;5>=o;o++)t>=o?this.$(".estrellas_form button."+o).addClass("activo"):this.$(".estrellas_form button."+o).removeClass("activo");this.$(".form_estrellas").addClass("valido"),this.model.set("valoracion",t)},verificar_titulo:function(){var t=this.$("#titulo_coment").val(),o=e("."+this.$("#titulo_coment").data("contenedor"));t?(o.addClass("valido").removeClass("error"),this.model.set("titulo_comentario",t)):o.addClass("error").removeClass("valido")},verificar_cant_content:function(){var e=this.$("#coment_content").val();e.length<50?(this.$(".content_coment").addClass("error").removeClass("valido"),this.$(".content_coment .requerido").html("Requerido "+e.length+"/50")):this.$(".content_coment").addClass("valido").removeClass("error")},contando_num:function(){var e=this.$("#coment_content").val();e.length<50?this.$(".content_coment .requerido").html("Requerido "+e.length+"/50"):(this.$(".content_coment .requerido").html('<span class="glyphicon glyphicon-ok"></span>'),this.model.set("comentario",e))},recomendacion_valor:function(t){this.$(".recomendaciones button").removeClass("activo"),this.$(".recomendaciones").addClass("valido"),e(t.target).addClass("activo"),this.model.set("recomendacion",t.target.dataset.valor)},enviar_comentario:function(){var e=this,t=this.model.toJSON();t.valoracion&&t.titulo_comentario&&t.comentario.length>50&&t.producto&&t.recomendacion?this.model.save().done(function(){e.collection.add(e.model),e.$el.modal("hide")}):this.$(".error-form").show()},subio_imagen:function(t){var o=new r({model:new s});o.render(),this.$(".imagenes_subidas").append(o.$el);var a=(e(t.target).val(),e(t.target).val().split(".").pop().toLowerCase());("jpg"===a||"png"===a||"jpeg"===a)&&this.model.save().done(function(a){var n=new FormData;n.append("foto",t.target.files[0]),n.append("comentario",a.id),e.ajax({url:"/api/comentarioimgs/",type:"POST",data:n,enctype:"multipart/form-data",cache:!1,contentType:!1,processData:!1}).done(function(e){var t=o.model;t.set(e)})})}});return l});