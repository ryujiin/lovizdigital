from django.contrib import admin
from models import *

class CarroAdmin (admin.ModelAdmin):
	list_display = ('id','__unicode__','date_created','num_lineas')

# Register your models here.
admin.site.register(Carro,CarroAdmin)
admin.site.register(LineaCarro)

