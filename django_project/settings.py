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
DEBUG = False

ALLOWED_HOSTS = ['*']

SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')


# Application definition

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    #apps terceros
    'rest_framework',
    'rest_framework.authtoken',
    'sorl.thumbnail',
    'social.apps.django_app.default',
    #'paypal_express_checkout',
    'paypal.standard.ipn',
    'corsheaders',
    #'storages',
    #'boto',
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
    'corsheaders.middleware.CorsMiddleware',
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

TIME_ZONE = 'America/Lima'

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

#STATICFILES_STORAGE = "require_s3.storage.OptimizedStaticFilesStorage"

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
    ),
}

#AWS_STORAGE_BUCKET_NAME = "lovizheroku"
#DEFAULT_FILE_STORAGE = 'storages.backends.s3boto.S3BotoStorage'

#MEDIA_ROOT = ''
#MEDIA_URL = "https://%s.s3.amazonaws.com/" % AWS_STORAGE_BUCKET_NAME

#AWS_ACCESS_KEY_ID = config.AWS_ACCESS_KEY_ID
#AWS_SECRET_ACCESS_KEY = config.AWS_SECRET_ACCESS_KEY

STRIPE_SECRET_KEY=config.STRIPE_SECRET_KEY
STRIPE_PUBLIC_KEY='pk_live_RMss6jsZ1PNqd3BFMpJfdF3e'

SHOP_CURRENCY = 'PEN'

#Paypal IPN
PAYPAL_RECEIVER_EMAIL = "lovizempresa@gmail.com"
PAYPAL_TEST = True

#Currency cambio
API_CURRENCY = '8649067b661349a8b2f2f2fa135246cf'
SITE_NAME = 'http://lovizdc.com'

#API KEYS LOGIN SOCIAL
#FACEBOOK
SOCIAL_AUTH_PIPELINE = (
    'social.pipeline.social_auth.social_details',
    'social.pipeline.social_auth.social_uid',
    'social.pipeline.social_auth.auth_allowed',
    'social.pipeline.social_auth.social_user',
    'social.pipeline.user.get_username',
    'social.pipeline.social_auth.associate_by_email', 
    'social.pipeline.user.create_user',
    'social.pipeline.social_auth.associate_user',
    'social.pipeline.social_auth.load_extra_data',
    'social.pipeline.user.user_details',
    'cliente.pipeline.save_profile_picture', #save facebook profile image,
)

SOCIAL_AUTH_FACEBOOK_KEY = config.SOCIAL_AUTH_FACEBOOK_KEY
SOCIAL_AUTH_FACEBOOK_SECRET = config.SOCIAL_AUTH_FACEBOOK_SECRET

SOCIAL_AUTH_FACEBOOK_SCOPE = ['email']

SOCIAL_AUTH_LOGIN_REDIRECT_URL = '/usuario/perfil/'
SOCIAL_AUTH_LOGIN_URL = '/ingresar/'




AUTHENTICATION_BACKENDS = (
    'social.backends.facebook.Facebook2AppOAuth2',
    'social.backends.facebook.Facebook2OAuth2',
    'cliente.backends.EmailOrUsernameModelBackend',    
    'django.contrib.auth.backends.ModelBackend',
)

EMAIL_BACKEND = "sgbackend.SendGridBackend"
SENDGRID_API_KEY = config.SENDGRID_API_KEY


MIDDLEWARE_CLASSES = (
    'django_seo_js.middleware.EscapedFragmentMiddleware',  # If you're using #!
    'django_seo_js.middleware.UserAgentMiddleware',  # If you want to detect by user agent
) + MIDDLEWARE_CLASSES

INSTALLED_APPS += ('django_seo_js',)

SEO_JS_PRERENDER_TOKEN = config.SEO_JS_PRERENDER_TOKEN

#Cros over Cambiarlo en el server
CORS_ORIGIN_ALLOW_ALL = True


try:
    from .local import *
except ImportError:
    pass