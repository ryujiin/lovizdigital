!function(e){e(document).ready(function(){e("fieldset.collapse").each(function(t,s){0==e(s).find("div.errors").length&&e(s).addClass("collapsed").find("h2").first().append(' (<a id="fieldsetcollapser'+t+'" class="collapse-toggle" href="#">'+gettext("Show")+"</a>)")}),e("fieldset.collapse a.collapse-toggle").click(function(){return e(this).closest("fieldset").hasClass("collapsed")?e(this).text(gettext("Hide")).closest("fieldset").removeClass("collapsed").trigger("show.fieldset",[e(this).attr("id")]):e(this).text(gettext("Show")).closest("fieldset").addClass("collapsed").trigger("hide.fieldset",[e(this).attr("id")]),!1})})}(django.jQuery);