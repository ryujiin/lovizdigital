
from django.conf.urls import patterns, include, url
from views import *

urlpatterns = patterns('',
	#url(r'^$',OfinaView.as_view() , name='inicio'),
	url(r'^$','oficina.views.ofina_views' , name='inicio'),
	url(r'^catalogo/','oficina.views.ofina_views' , name='inicio'),
	url(r'^pedidos/$','oficina.views.ofina_views' , name='inicio'),
	url(r'^clientes/$','oficina.views.ofina_views' , name='inicio'),
)