from django.shortcuts import render
from django.conf import settings
from django.http import HttpResponseRedirect, HttpResponseBadRequest,Http404,HttpResponse
from carro.models import Carro
from pedido.models import Pago
import json
import stripe


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

# Create your views here.
