define(["jquery","underscore","backbone","swig","../../views/cliente/mayorista_list"],function(e,t,n,i,a){"use strict";var l=n.View.extend({template:i.compile(e("#mayoristas_panel_tlp").html()),tagName:"div",id:"",className:"",events:{},initialize:function(){this.render()},render:function(){var e=this;this.collection.fetch().done(function(t){e.$el.html(e.template({num:t.length})),e.collection.forEach(e.addOne,e)})},addOne:function(e){var t=new a({model:e});this.$(".lista_mayoristas").append(t.$el)}});return l});