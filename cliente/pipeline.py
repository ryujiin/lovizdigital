from requests import request, HTTPError
from django.core.files.base import ContentFile
from models import Cliente

def save_profile_picture(backend, user, response, details,is_new=False,*args,**kwargs):

	if is_new and backend.name == 'facebook':
		url = 'http://graph.facebook.com/{0}/picture'.format(response['id'])

		try:
			response = request('GET', url, params={'type': 'large'})
			response.raise_for_status()
		except HTTPError:
			pass
		else:
			try:
				profile = Cliente.objects.get(usuario=user)
			except Cliente.DoesNotExist:
				profile = Cliente(usuario=user)
			profile.foto.save('{0}_social.jpg'.format(user.username),
									ContentFile(response.content))
			profile.save()