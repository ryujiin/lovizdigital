from django.contrib import admin
from models import *
# Register your models here.

class ImageCarruselInline(admin.TabularInline):
	model = ImageCarrusel

class BloqueAdmin(admin.ModelAdmin):
	inlines = [ImageCarruselInline,]

class LinkMenuInline(admin.TabularInline):
	model = LinkMenu

class MenuAdmin(admin.ModelAdmin):
	inlines = [LinkMenuInline,]

admin.site.register(Carrusel)
admin.site.register(SeccionesCMS)
admin.site.register(Page)
admin.site.register(Bloque,BloqueAdmin)
admin.site.register(ImageCarrusel)
admin.site.register(TemplateBloque)
admin.site.register(Menu,MenuAdmin)