from rest_framework import serializers
from models import *


class ColorSerializer(serializers.ModelSerializer):

	class Meta:
		model = Color