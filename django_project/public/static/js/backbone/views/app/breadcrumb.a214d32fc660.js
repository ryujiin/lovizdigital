define(["jquery","underscore","backbone","swig","../../views/app/breadcrumbLink","../../collections/breadcrumb"],function(e,i,t,n,c,l){"use strict";var o=t.View.extend({template:n.compile(e("#breadcrumb_tlp").html()),id:"",className:"",events:{},collection:new l,initialize:function(){this.collection.reset()},render:function(){this.$el.html(this.template()),this.$("ol").empty(),this.collection.forEach(this.addLink,this)},addLink:function(e){var i=new c({model:e});this.$("ol").append(i.$el)},desaparecer:function(){this.$el.hide()}});return o});