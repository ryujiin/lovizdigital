from django.contrib import admin
from models import *
# Register your models here.

class TallaAdmin(admin.ModelAdmin):
	list_display = ('id','nombre','orden')

admin.site.register(Color)
admin.site.register(Talla,TallaAdmin)
