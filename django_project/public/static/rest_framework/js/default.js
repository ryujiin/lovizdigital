function getCookie(e){var t=document.cookie,a=t.indexOf(" "+e+"=");if(-1==a&&(a=t.indexOf(e+"=")),-1==a)t=null;else{a=t.indexOf("=",a)+1;var o=t.indexOf(";",a);-1==o&&(o=t.length),t=unescape(t.substring(a,o))}return t}prettyPrint(),$(".js-tooltip").tooltip({delay:1e3,container:"body"}),$('a[data-toggle="tab"]:first').on("shown",function(e){$(e.target).parents(".tabbable").addClass("first-tab-active")}),$('a[data-toggle="tab"]:not(:first)').on("shown",function(e){$(e.target).parents(".tabbable").removeClass("first-tab-active")}),$('a[data-toggle="tab"]').click(function(){document.cookie="tabstyle="+this.name+"; path=/"});var selectedTab=null,selectedTabName=getCookie("tabstyle");selectedTabName&&(selectedTabName=selectedTabName.replace(/[^a-z-]/g,"")),selectedTabName&&(selectedTab=$(".form-switcher a[name="+selectedTabName+"]")),selectedTab&&selectedTab.length>0?selectedTab.tab("show"):$(".form-switcher a:first").tab("show"),$(window).load(function(){$("#errorModal").modal("show")});