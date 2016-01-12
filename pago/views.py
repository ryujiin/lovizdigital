from django.shortcuts import render
from django.conf import settings
from django.http import HttpResponseRedirect, HttpResponseBadRequest,Http404,HttpResponse
from carro.models import Carro
from pedido.models import Pago,MetodoPago,Pedido
import json
import stripe
import urllib2
import urllib
import urlparse

from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist

from paypal.standard.forms import PayPalPaymentsForm
from django.core.urlresolvers import reverse
from django.views.decorators.csrf import csrf_exempt

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
			return HttpResponse(json.dumps({'error',error}),
			content_type='application/json;charset=utf8')
		else:
			metodo = MetodoPago.objects.get(nombre='Stripe')			
			pago = Pago(cantidad = amount/100,
						id_pago=stripe_result['id'],
						descripcion=description,
						metodo_pago = metodo,
						transaccion = card_token)
			pago.save()
			pedido.pago_pedido = pago
			pedido.metodo_pago = metodo
			pedido.save()
			carro.estado = carro.ENVIADA
			carro.save()
			request.session['pedido'] = pedido.numero_pedido
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
			"return_url": "%s/retorno_paypal/%s/" %(settings.SITE_NAME,pedido),
			"cancel_return": "%s/cancelado_paypal/%s/" %(settings.SITE_NAME,pedido),
			"custom": "Comprando los mejores productos!",  # Custom command to correlate to some function later (optional)
			}
		form = PayPalPaymentsForm(initial=paypal_dict)
		context = {"form": form,'total_carro':total_carro,'tipo_cambio':tipo_cambio,'total_dolares':total_dolares}
		return render(request, "payment.html", context)
	else:
		raise Http404("No Hay Pedido")


from django.shortcuts import redirect

@csrf_exempt
def retorn_paypal(request):
	if request.POST:
		metodo = MetodoPago.objects.get(nombre='Paypal')
		pedido = Pedido.objects.get(numero_pedido=request.POST['invoice'])
		carro = Carro.objects.get(pedido=pedido.pk) 

		pago = Pago(cantidad=request.POST['payment_gross'],
				id_pago = request.POST['invoice'],
				metodo_pago = metodo,
				descripcion = request.POST['payment_status'],
				transaccion = request.POST['txn_id'])			
		pago.save()

		pedido.pago_pedido = pago
		pedido.metodo_pago = metodo
		pedido.save()
		
		carro.estado = carro.ENVIADA
		carro.save()
		
		request.session['pedido'] = request.POST['invoice'];

		return HttpResponseRedirect(reverse('felicidades'))

def get_pago_contraentrega(request):
	if request.POST:
		metodo = MetodoPago.objects.get(nombre='Contra entrega')
		pedido = Pedido.objects.get(numero_pedido=request.POST.get('id_pago'))
		carro = Carro.objects.get(pedido=pedido.pk) 

		total = carro.total_carro()

		pago = Pago(cantidad= total,
				id_pago = pedido.numero_pedido,
				metodo_pago = metodo,
				descripcion = 'Pago contra entrega, esperando el pago cuando se envia',
				transaccion = request.POST['transaccion'])			
		pago.save()

		pedido.pago_pedido = pago
		pedido.metodo_pago = metodo
		pedido.save()
		
		carro.estado = carro.ENVIADA
		carro.save()
		
		request.session['pedido'] = pedido.numero_pedido;
		return HttpResponse(json.dumps({'status':'ok'}),content_type='application/json;charset=utf8')
	else:
		raise Http404("No Hay Pedido")



def get_stripe_key(request):
	return HttpResponse(json.dumps({'key':settings.STRIPE_PUBLIC_KEY}),content_type='application/json;charset=utf8')
