# -*- coding: utf-8 -*-

from django import forms
from .models import Ubigeo
from .fields import UbigeoField


class UbigeoForm(forms.ModelForm):
    class Meta:
        model = Ubigeo


class UbigeoSelect(forms.Form):

    ubigeo = UbigeoField()
    
    def __init__(self, *args, **kwargs):
        super(UbigeoSelect, self).__init__(*args, **kwargs)
        if self.data:
            regions = Ubigeo.objects.filter(
                political_divison=Ubigeo.POLITICAL_DIVISION_CHOICES.REGION) \
                .order_by('name')
            provinces = Ubigeo.objects.filter(
                parent=self.data['ubigeo_0']).order_by('name')
            districts = Ubigeo.objects.filter(
                parent=self.data['ubigeo_1']).order_by('name')
            self.fields['ubigeo'].fields[0].queryset = regions
            self.fields['ubigeo'].fields[1].queryset = provinces
            self.fields['ubigeo'].fields[2].queryset = districts
