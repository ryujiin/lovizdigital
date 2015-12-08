"""
Django settings for django_project project.

For more information on this file, see
https://docs.djangoproject.com/en/1.6/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.6/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os
import config

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
location = lambda x: os.path.join(
    os.path.dirname(os.path.realpath(__file__)), x)

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.6/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config.SECRET_KEY

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    #apps terceros
    'require',
    'rest_framework',
    'rest_framework.authtoken',
    'sorl.thumbnail',
    #'paypal_express_checkout',
    'paypal.standard.ipn',
    #'storages',
    'carro',
    'catalogo',
    'cliente',
    'contabilidad',
    'cmsweb',
    'material',
    'oficina',
    'pedido',
    'pago',
    'ubigeo',
    'utiles',
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.security.SecurityMiddleware',
)

ROOT_URLCONF = 'django_project.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            location('templates'),
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'debug': DEBUG,
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]


WSGI_APPLICATION = 'django_project.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.6/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': config.NAME,
        'USER': config.USER,
        'PASSWORD': config.PASSWORD,
        'HOST': 'localhost',
        'PORT': '',
    }
}

# Internationalization
# https://docs.djangoproject.com/en/1.6/topics/i18n/

LANGUAGE_CODE = 'es-mx'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.6/howto/static-files/

MEDIA_ROOT = location("public/media")
MEDIA_URL = '/media/'

STATIC_ROOT = location('public/static')
STATIC_URL = '/static/'

STATICFILES_DIRS = (
    location('staticos'),
)

STATICFILES_STORAGE = "require_s3.storage.OptimizedStaticFilesStorage"

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
    ),
}

AUTHENTICATION_BACKENDS = (
    'cliente.backends.EmailOrUsernameModelBackend',    
    'django.contrib.auth.backends.ModelBackend',
)

AWS_STORAGE_BUCKET_NAME = "lovizheroku"
DEFAULT_FILE_STORAGE = 'storages.backends.s3boto.S3BotoStorage'

MEDIA_ROOT = ''
MEDIA_URL = "https://%s.s3.amazonaws.com/" % AWS_STORAGE_BUCKET_NAME

AWS_ACCESS_KEY_ID = config.AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY = config.AWS_SECRET_ACCESS_KEY

STRIPE_SECRET_KEY=config.STRIPE_SECRET_KEY
SHOP_CURRENCY = 'PEN'

#Paypal
#HOSTNAME = 'http://localhost:8000'  # without trailing slash
#PAYPAL_API_URL = 'https://api-3t.sandbox.paypal.com/nvp'
#PAYPAL_LOGIN_URL = (
    #'https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token='
#)
#SALE_DESCRIPTION = 'Tu pago a Inversiones Lopez del Carpio E.I.R.L.'
#
#PAYPAL_USER = 'lovizempresa_api1.gmail.com'
#PAYPAL_PWD = '1378765810'
#PAYPAL_SIGNATURE = 'AFcWxV21C7fd0v3bYYYRCpSSRl31AeEIBVzZGuWPIPzHr25TE7.63Rzv'
#
#CANCER_URL = 'http://localhost:8000/cancelado/'
#RETURN_URL = 'http://localhost:8000/checkout/salioBien'

#Paypal IPN
PAYPAL_RECEIVER_EMAIL = "lovizempresa@gmail.com"
PAYPAL_TEST = True

try:
    from .local import *
except ImportError:
    pass