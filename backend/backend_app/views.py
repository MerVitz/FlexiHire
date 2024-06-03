from rest_framework import generics, viewsets
from rest_framework.response import Response

from .models import (Booking, Comment, CustomUser, Equipment, Maintenance,
                     Notification, Payment, Review)
from .serializers import (BookingSerializer, CommentSerializer,
                          CustomUserSerializer, EquipmentSerializer,
                          MaintenanceSerializer, NotificationSerializer,
                          PaymentSerializer, ReviewSerializer)


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class MaintenanceViewSet(viewsets.ModelViewSet):
    queryset = Maintenance.objects.all()
    serializer_class = MaintenanceSerializer

class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

class EquipmentViewSet(viewsets.ModelViewSet):
    queryset = Equipment.objects.all()
    serializer_class = EquipmentSerializer

class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    
    def create(self, request, *args, **kwargs):
        # Ensure the user_type is not being set to 'admin' by a non-admin user
        if 'user_type' in request.data and request.data['user_type'] == CustomUser.ADMIN:
            if not request.user.is_staff:
                return Response({'detail': 'Only admin users can create other admin users.'}, status=status.HTTP_403_FORBIDDEN)
        
        return super().create(request, *args, **kwargs)
    
class UserCreate(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer



# Create your views here.
