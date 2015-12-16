from django.shortcuts import render
from django.conf import settings
from django.http import HttpResponseRedirect, HttpResponseBadRequest,Http404,HttpResponse
from carro.models import Carro
from pedido.models import Pago,MetodoPago
import json
import stripe
import urllib2
import urllib
import urlparse

from django.conf import settings

from paypal.standard.forms import PayPalPaymentsForm
from django.core.urlresolvers import reverse
# Create your views here.
def stripe_paymet(request):
	stripe.api_key = settings.STRIPE_SECRET_KEY
	
	if request.method == 'POST':
		try:
			card_token = request.POST['stripeToken']
			carro_id = request.POST['carro']
		except KeyError:
			return HttpResponseBadRequest('stripeToken not set')
		currency = getattr(settings, 'SHOP_CURRENCY', 'usd')
		carro = Carro.objects.get(pk = carro_id)
		pedido = carro.pedido
		amount = carro.total_carro()
		amount = int(amount*100)
		if request.user.is_authenticated():
			propietario = request.user.email
		else:
			propietario = 'Invitado'
		description = '%s de %s' %(card_token,propietario)

		stripe_dict = {
			'amount': amount,
			'currency': currency,
			'card': card_token,
			'description': description,
		}
		try:
			stripe_result = stripe.Charge.create(**stripe_dict)
		except stripe.error.CardError, e:
			error = e
		else:
			metodo = MetodoPago.objects.get(nombre='Stripe')			
			pago = Pago(cantidad = amount/100,id_pago=stripe_result['id'],descripcion=description,metodo_pago = metodo)
			pago.save()
			pedido.pago_pedido = pago
			pedido.metodo_pago = metodo
			pedido.save()
			carro.estado = carro.ENVIADA
			carro.save()
		return HttpResponse(json.dumps({'status': stripe_result['status'],'pedido': pedido.numero_pedido}),
			content_type='application/json;charset=utf8')
	else:
		raise Http404

def get_tipo_cambio():
	url = 'https://openexchangerates.org/api/latest.json?app_id=%s' %settings.API_CURRENCY
	req = urllib2.urlopen(url)
	content = req.read()
	data = json.loads(content)
	data = float(data["rates"]['PEN'])
	return data


def paypal_paymet(request):
	pedido = request.GET['pedido']
	tipo_cambio = round(get_tipo_cambio(),2)
	if pedido:
		try:
			carro = Carro.objects.get(pedido__numero_pedido = pedido)
		except Carro, DoesNotExist:
			raise Http404('No hay pedido en el carro')
		total_carro = carro.total_carro()
		total_dolares = round(total_carro/tipo_cambio,2)
		
		paypal_dict = {
			"business": settings.PAYPAL_RECEIVER_EMAIL,
			"amount": total_dolares,
			"item_name": "productos LovizDC",
			"invoice": pedido,
			"notify_url": settings.SITE_NAME + reverse('paypal-ipn'),
			"return_url": "%s/felicidades/%s/" %(settings.SITE_NAME,pedido),
			"cancel_return": "%s/cancelado/%s/" %(settings.SITE_NAME,pedido),
			"custom": "Comprando los mejores productos!",  # Custom command to correlate to some function later (optional)
			}
		form = PayPalPaymentsForm(initial=paypal_dict)
		context = {"form": form,'total_carro':total_carro,'tipo_cambio':tipo_cambio,'total_dolares':total_dolares}
		return render(request, "payment.html", context)
	else:
		raise Http404("No Hay Pedido")

def get_stripe_key(request):
	return HttpResponse(json.dumps({'key':settings.STRIPE_PUBLIC_KEY}),content_type='application/json;charset=utf8')
