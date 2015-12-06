from django.conf.urls import include, url
from django.contrib import admin

import settings

from catalogo import views
from carro.views import LineasViewsets,CarroViewsets
from cmsweb.views import CarruselViewsets
from utiles.views import ColorViewsets
from pedido.views import PedidoViewSet,MetodoEnvioViewSet
from ubigeo.views import RegionViewset
from cliente.views import DireccionViewsets,ComentarioViewSet,MayoristaViewset,ComentarioImagenViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'catalogo', views.CatalogoViewsets,'catalogo')
router.register(r'categoria', views.CategoriaViewsets,'categorias')
router.register(r'carro/lineas',LineasViewsets,'lineas')
router.register(r'cmsweb/carrusel',CarruselViewsets,'carruseles')
router.register(r'colores',ColorViewsets,'coleres')
router.register(r'pedidos',PedidoViewSet,'pedidos')
router.register(r'ubigeo',RegionViewset,'ubigeo')
router.register(r'cliente/direcciones',DireccionViewsets,'direcciones')
router.register(r'metodos_envio',MetodoEnvioViewSet,'mentodos_envios')
router.register(r'comentarios',ComentarioViewSet,'comentarios')
router.register(r'comentarioimgs',ComentarioImagenViewSet,'comentarios_imagenes')
router.register(r'oficina/mayoristas',MayoristaViewset,'mayoristas')
router.register(r'oficina/catalogo',views.CatalogoOficinaViewsets,'Catalogo_oficina')


urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/', include(router.urls)),
    url(r'^api/carro/', include('carro.urls')),
    url(r'^api/user/', include('cliente.urls')),
    url(r'^ajax/crear/', 'cliente.views.nuevo_usuario', name='nuevo_usuario'),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api-token-auth/', 'rest_framework_jwt.views.obtain_jwt_token'),
    url(r'^salir/$','cliente.views.salir',name='salir'),
    url(r'^login/$','cliente.views.ingresar',name='salir'),
    url(r'^pago/stripe/$','pago.views.stripe_paymet',name='pago_stripe'),
    url(r'^oficina/',include('oficina.urls')),    
    #url(r'^checkout/', include('paypal_express_checkout.urls')),
    url(r'^',include('cmsweb.urls')),

]
if settings.DEBUG:
    urlpatterns = [
    url(r'^media/(?P<path>.*)$', 'django.views.static.serve',
        {'document_root': settings.MEDIA_ROOT, 'show_indexes': True}),
] + urlpatterns