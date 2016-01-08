define(["jquery","underscore","backbone","swig","carro","../../views/app/loader_full"],function(e,a,r,t,s,n){"use strict";var o=r.View.extend({template:t.compile(e("#pago_tarjeta_tlp").html()),tagName:"div",id:"",className:"",events:{"keydown #number":"ver_numero","keyup #number":"contar_numero","blur input":"get_datos","blur select":"get_datos"},initialize:function(){this.render()},render:function(){var a=this;e.get("/get_stripe_key/").done(function(e){a.stripe_key=e.key,a.$el.html(a.template(a.model.toJSON()))})},ver_numero:function(e){return e.keyCode>=48&&e.keyCode<=57||8==e.keyCode?!0:!1},get_datos:function(e){{var a=e.target.value,r="."+e.target.dataset.contenedor;this.validar_vacio(a,r)}},validar_vacio:function(e,a){var r=this.$(a+" .error");return r.empty(),""===e?(this.$(a).addClass("has-error").removeClass("has-success"),r.append('<p class="text-danger">Este campo es Requerido *</p>'),!1):(this.$(a).addClass("has-success").removeClass("has-error"),!0)},contar_numero:function(){var a=this.$("#number").val().length,r=e("."+this.$("#number").data("contenedor"));a>=16?r.addClass("has-success"):r.removeClass("has-success")},verificar:function(){this.verificar_inputs(),this.enviar_form()},verificar_inputs:function(){this.$("input").each(function(a,r){0===r.value.length?e("."+r.dataset.contenedor).addClass("has-error"):e("."+r.dataset.contenedor).addClass("has-success").removeClass("has-error")}),this.$("select").each(function(a,r){0===r.value.length?e("."+r.dataset.contenedor).addClass("has-error"):e("."+r.dataset.contenedor).addClass("has-success").removeClass("has-error")})},enviar_form:function(){var e=this.$("#name").val(),a=this.$("#number").val(),r=this.$("#mes").val(),t=this.$("#year").val(),s=this.$("#cvc").val();e&&a&&r&&t&&s&&this.pago_Stripe(e,a,r,t,s)},pago_Stripe:function(a,r,t,o,i){this.loader=new n;var d=this,c=d.stripe_key;Stripe.setPublishableKey(c);var l=function(a,r){var t=e("#pagar_tarjeta");if(r.error)d.loader.remove(),t.find(".payment-errors").text(r.error.message),t.find("button").prop("disabled",!1);else{var n=r.id;t.append(e('<input type="hidden" name="stripeToken" />').val(n));var o=s;e.post("/pago/stripe/",{stripeToken:n,carro:o.id}).done(function(e){"paid"===e.status&&(window.location="/felicidades/"+e.pedido+"/"),d.loader.remove()})}},u={number:r,cvc:i,exp_month:t,exp_year:o};Stripe.card.createToken(u,l)}});return o});