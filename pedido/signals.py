from paypal.standard.models import ST_PP_COMPLETED
from paypal.standard.ipn.signals import valid_ipn_received,payment_was_successful

def show_me_the_money(sender, **kwargs):
	ipn_obj = sender
	if ipn_obj.payment_status == ST_PP_COMPLETED:
		print 'Bien'
		if ipn_obj.custom == "Upgrade all users!":
			Users.objects.update(paid=True)
	else:
		print 'Salio Mal'

valid_ipn_received.connect(show_me_the_money)
payment_was_successful.connect(show_me_the_money)