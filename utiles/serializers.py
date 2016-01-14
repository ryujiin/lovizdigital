from rest_framework import serializers
from models import *


class ColorSerializer(serializers.ModelSerializer):

	class Meta:
		model = Color

class TallaSerializer(serializers.ModelSerializer):

	class Meta:
		model = Talla

