from rest_framework import serializers

from .models import (Booking, Comment, CustomUser, Equipment, Maintenance,
                     Notification, Payment, Review)


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class MaintenanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Maintenance
        fields = '__all__'

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'

    def update(self, instance, validated_data):
        image = validated_data.pop('image', None)
        if image is not None:
            instance.image = image
        return super().update(instance, validated_data)

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'

class EquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipment
        fields = '__all__'

    def validate_price_per_day(self, value):
        try:
            value = float(value)
        except ValueError:
            raise serializers.ValidationError("Price per day must be a float.")
        return value

    def update(self, instance, validated_data):
        image = validated_data.pop('image', None)
        if image is not None:
            instance.image = image
        return super().update(instance, validated_data)

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('email', 'password', 'first_name', 'last_name')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name'),
            last_name=validated_data.get('last_name')
        )
        return user