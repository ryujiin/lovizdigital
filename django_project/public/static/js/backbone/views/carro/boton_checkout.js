define(["jquery","underscore","backbone","swig"],function(e,t,i,n){"use strict";var s=i.View.extend({template:n.compile(e("#boton_checkout_tlp").html()),tagName:"div",id:"",className:"",events:{},initialize:function(){this.listenTo(this.model,"change",this.render),this.render()},render:function(){this.$el.html(this.template(this.model.toJSON()))}});return s});