define(["jquery","underscore","backbone","swig","../../views/usuario/user_formLogin","../../views/usuario/user_formCrear"],function(e,i,s,t,o,a){"use strict";var r=s.View.extend({template:t.compile(e("#paso_identificar_tlp").html()),tagName:"div",id:"",className:"",events:{},initialize:function(){this.listenTo(this.model,"change",this.render),this.render()},render:function(){this.$el.html(this.template(this.model.toJSON()));var e=this.model.toJSON().paso_actual;1===e&&(this.add_forms(),this.$el.addClass("is-activo")),e>1&&this.$el.addClass("is-guardado").removeClass("is-activo")},add_forms:function(){new o({el:this.$(".login_form"),model:this.model}),new a({el:this.$(".crear_user"),model:this.model})}});return r});