define(["underscore","backbone","../models/pedido","../models/user"],function(e,i,n){"use strict";var o=i.Collection.extend({url:"/api/pedidos/",model:n,initialize:function(){}}),d=new o;return d});