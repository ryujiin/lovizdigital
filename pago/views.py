from django.shortcuts import render
from django.conf import settings
from django.http import HttpResponseRedirect, HttpResponseBadRequest,Http404,HttpResponse
from carro.models import Carro
from pedido.models import Pago
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
			pago = Pago(cantidad = amount/100,id_pago=stripe_result['id'],descripcion=description)
			pago.save()
			pedido.pago_pedido = pago
			pedido.save()
			carro.estado = carro.ENVIADA
			carro.save()
		return HttpResponse(json.dumps({'status': stripe_result['status'],'pedido': pedido.numero_pedido}),
			content_type='application/json;charset=utf8')
	else:
		raise Http404

def paypal_paymet(request):
    # What you want the button to do.
    pedido = request.GET['pedido']

    paypal_dict = {
        "business": settings.PAYPAL_RECEIVER_EMAIL,
        "amount": "1000.00",
        "item_name": "productos LovizDC",
        "invoice": pedido,
        "notify_url": "http://localhost:8000" + reverse('paypal-ipn'),
        "return_url": "http://localhost:8000/your-return-location/",
        "cancel_return": "http://localhost:8000/cancelado",
        "custom": "Upgrade all users!",  # Custom command to correlate to some function later (optional)
    }

    # Create the instance.
    form = PayPalPaymentsForm(initial=paypal_dict)
    context = {"form": form}
    return render(request, "payment.html", context)

"""
def paypal_paymet(request):
	if request.method == 'GET':
		api_url = 'https://api-3t.sandbox.paypal.com/nvp'

		data = urllib.urlencode({
			'USER': settings.PAYPAL_USER, 
			'PWD': settings.PAYPAL_PWD,
			'SIGNATURE':settings.PAYPAL_SIGNATURE,
			'VERSION':109.0,
			'METHOD':'SetExpressCheckout',
			'PAYMENTREQUEST_0_AMT':19.00,
			'PAYMENTREQUEST_0_PAYMENTACTION':'SALE',
			'PAYMENTREQUEST_0_CURRENCYCODE':'USD',
			'cancelUrl':settings.CANCER_URL,
			'returnUrl':settings.RETURN_URL,
			})
		try:
			response = urllib2.urlopen(api_url, data=data)
		except (
	            urllib2.HTTPError,
	            urllib2.URLError,
	            httplib.HTTPException), ex:
			self.log_error(ex, api_url=api_url, request_data=data,transaction=transaction)
		else:
			parsed_response = urlparse.parse_qs(response.read())
			if parsed_response.get('ACK')[0] == 'Success':
				token = parsed_response.get('TOKEN')[0]

		return HttpResponse(json.dumps({'token':token}),
				content_type='application/json;charset=utf8')
	else:
		raise Http404("No es una peticion POST")

"""