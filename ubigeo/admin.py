from django.contrib import admin
from models import *

class UbigeoAdmin(admin.ModelAdmin):
	list_display = ('id','__unicode__')

admin.site.register(Ubigeo,UbigeoAdmin)
