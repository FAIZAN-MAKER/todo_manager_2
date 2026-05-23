from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['email', 'fullname', 'password', 'pfp']

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def create(self, validated_data):
        return User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            fullname=validated_data['fullname'],
            pfp=validated_data.get('pfp', None)
        )

class UserSerializer(serializers.ModelSerializer):
    pfp = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'email', 'fullname', 'pfp']

    def get_pfp(self, obj):
        if obj.pfp:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.pfp.url)
        return None