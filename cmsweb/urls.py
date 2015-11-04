
from django.conf.urls import patterns, include, url
from views import *

urlpatterns = patterns('',
	url(r'^$',TiendaView.as_view() , name='index'),
	url(r'^catalogo/',TiendaView.as_view() , name='catalogo'),
	url(r'^producto/',TiendaView.as_view() , name='producto'),
	url(r'^carro/',TiendaView.as_view() , name='carro'),
	url(r'^usuario/perfil/$',TiendaView.as_view() , name='carro'),
	url(r'^procesar-compra/',TiendaView.as_view() , name='procesar'),
)