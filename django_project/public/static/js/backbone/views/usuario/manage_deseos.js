define(["jquery","underscore","backbone","swig"],function(e,t,i,n){"use strict";var s=i.View.extend({template:n.compile(e("#usuario_lista_deseos_tpl").html()),id:"",className:"",events:{},initialize:function(){this.render()},render:function(){this.$el.html(this.template(this.model.toJSON()))}});return s});