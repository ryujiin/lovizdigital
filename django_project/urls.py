from django.conf.urls import include, url
from django.contrib import admin

import settings

from rest_framework_jwt.views import obtain_jwt_token,verify_jwt_token

from catalogo import views
from catalogo import views as oficina_views
from carro.views import LineasViewsets,CarroViewsets
from cmsweb.views import CarruselViewsets,PageViewsets,MenuViewsets,VerificarView
from utiles.views import ColorViewsets,TallasViewsets
from pedido.views import PedidoViewSet,MetodoEnvioViewSet
from ubigeo.views import RegionViewset
from cliente.views import DireccionViewsets,ComentarioViewSet,MayoristaViewset,ComentarioImagenViewSet,SuscritoViewset
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'v2/productos', views.CatalogoViewsets,'productos')

#router.register(r'catalogo', views.CatalogoViewsets,'catalogo')
router.register(r'categoria', views.CategoriaViewsets,'categorias')
router.register(r'carro/lineas',LineasViewsets,'lineas')
router.register(r'cmsweb/carrusel',CarruselViewsets,'carruseles')
router.register(r'cmsweb/pages',PageViewsets,'pages')
router.register(r'cmsweb/menus',MenuViewsets,'menus')
router.register(r'colores',ColorViewsets,'coleres')
router.register(r'tallas',TallasViewsets,'tallas')
router.register(r'pedidos',PedidoViewSet,'pedidos')
router.register(r'ubigeo',RegionViewset,'ubigeo')
router.register(r'cliente/direcciones',DireccionViewsets,'direcciones')
router.register(r'metodos_envio',MetodoEnvioViewSet,'mentodos_envios')
router.register(r'comentarios',ComentarioViewSet,'comentarios')
router.register(r'comentarioimgs',ComentarioImagenViewSet,'comentarios_imagenes')
router.register(r'cliente/suscrito',SuscritoViewset,'suscritos')

router_oficina = DefaultRouter();
router_oficina.register(r'catalogo/producto',oficina_views.ProductosOficinaViewsets,'productos_oficina')
router_oficina.register(r'catalogo/productoSingle',oficina_views.ProductoSingleEditableViewsets,'producto_single')


urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/', include(router.urls)),
    url(r'^api/carro/', include('carro.urls')),
    url(r'^api/user/', include('cliente.urls')),
    url(r'^ajax/crear/', 'cliente.views.nuevo_usuario', name='nuevo_usuario'),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api-token-auth/', obtain_jwt_token),
    url(r'^api-token-verify/', verify_jwt_token),
    url(r'^salir/$','cliente.views.salir',name='salir'),
    url(r'^login/$','cliente.views.ingresar',name='salir'),
    #pagos
    url(r'^pago_contraentrega/','pago.views.get_pago_contraentrega',name='pago_contraentrega'),    
    url(r'^definir_pago/','pago.views.definir_pago',name='definir_pago'),    
    url(r'^retorno_paypal/','pago.views.retorn_paypal',name='retorn_paypal'),    
    url(r'^pago/stripe/$','pago.views.stripe_paymet',name='pago_stripe'),
    url(r'^get_stripe_key/$','pago.views.get_stripe_key',name='get_key'),    
    url(r'^pago/paypal/', 'pago.views.paypal_paymet',name = 'pago_paypal'),    
    url(r'^hardcode/get/paypal/', include('paypal.standard.ipn.urls')),
    #api oficina
    url(r'^api_oficina/',include(router_oficina.urls)),
    url('', include('social.apps.django_app.urls', namespace='social')),
    url(r'^oficina/',include('oficina.urls')),    
    url(r'^',include('cmsweb.urls')),

]
if settings.DEBUG:
    urlpatterns = [
    url(r'^media/(?P<path>.*)$', 'django.views.static.serve',
        {'document_root': settings.MEDIA_ROOT, 'show_indexes': True}),
] + urlpatterns