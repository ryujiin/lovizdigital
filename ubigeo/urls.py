# -*- coding: utf-8 -*-

from django.conf.urls import patterns, url

urlpatterns = patterns('ubigeo.views',
    url(r'^region/json/$', 'region', name='ubigeo-region-json'),
    url(r'^provincia/json/$', 'provincia', name='ubigeo-provincia-json'),
    url(r'^distrito/json/$', 'distrito', name='ubigeo-distrito-json'),
)
