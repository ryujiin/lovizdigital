define(["jquery","underscore","backbone","swig"],function(a,e,i){"use strict";var n=i.View.extend({tagName:"div",id:"",className:"",events:{},initialize:function(){this.render()},render:function(){this.addForm()},addForm:function(){var e=this;a.get("/pago/paypal/",{pedido:this.model.toJSON().numero_pedido}).done(function(i){e.$("#form_paypal").html(i),e.$("#form_paypal form").hide(),a(".panel_seccion_final .paypal").addClass("paypal_ready")}).fail(function(){a(".panel_seccion_final button").removeClass("visto")})},pagar_paypal:function(){this.$("form").submit()}});return n});