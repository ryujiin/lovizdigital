define(["jquery","underscore","backbone","swig"],function(e,t,i,r){"use strict";var n=i.View.extend({el:e(".mini-cart"),template:r.compile(e("#mini_carro_template").html()),tagName:"div",id:"",className:"",events:{click:"navegar_carro"},initialize:function(){this.render(),this.listenTo(this.model,"change",this.render)},render:function(){this.$el.html(this.template(this.model.toJSON()))},navegar_carro:function(){i.history.navigate("/carro/",{trigger:!0})}});return n});