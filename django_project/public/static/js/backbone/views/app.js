define(["jquery","underscore","backbone","../models/user","../collections/menus","../views/usuario/user_links","carro","../views/carro/mini_carro","../views/app/menu","../views/app/bloque_suscrito","../models/suscrito"],function(e,n,o,i,a,r,t,s,c,u,l){"use strict";var d=o.View.extend({el:e("body"),className:"",events:{"click .link":"navegar","click .no-link":"no_navegar","click .menu-mobil-icono":"mostrar_navegador_mobil"},initialize:function(e){e.on("route",function(){});new r({model:i}),new s({model:t});this.addMenus(),this.addBloqueSuscrito()},navegar:function(n){n.preventDefault();var i=n.currentTarget.pathname;o.history.navigate(i,{trigger:!0}),e("#navigation").removeClass("is_activo"),e("body").animate({scrollTop:0},"slow")},no_navegar:function(e){e.preventDefault()},mostrar_navegador_mobil:function(){e("#navigation").toggleClass("is_activo")},addBloqueSuscrito:function(){new u({el:e("#suscribirse"),model:new l})},addMenus:function(){var e=new a;e.fetch().done(function(){e.forEach(function(e){new c({model:e})})})}});return d});