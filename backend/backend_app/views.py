# views.py
from django.contrib.auth import authenticate, login, logout
from rest_framework import generics, status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action

from .models import (Booking, Comment, CustomUser, Equipment, Maintenance,
                     Notification, Payment, Review)
from .serializers import (BookingCreateUpdateSerializer, BookingRetrieveSerializer, CommentSerializer,
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
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user)

class NotificationConfirmView(generics.UpdateAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.confirmed = True
        instance.save()

        # Update related booking status if required
        if instance.requires_confirmation:
            booking = instance.booking
            booking.is_confirmed = True
            booking.save()

            # Notify user that booking is confirmed
            Notification.objects.create(
                user=booking.user,
                booking=booking,
                message=f"Your booking for {booking.equipment.name} from {booking.start_time} to {booking.end_time} has been successful.",
                requires_confirmation=False
            )

        return Response({'status': 'notification confirmed'})

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.select_related('equipment', 'user').all()

    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:
            return BookingRetrieveSerializer
        return BookingCreateUpdateSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            
            booking = serializer.instance

            # Notify admin for confirmation
            admin_users = CustomUser.objects.filter(user_type=CustomUser.ADMIN)
            for admin in admin_users:
                Notification.objects.create(
                    user=admin,
                    booking=booking,
                    message=f"Booking request for {booking.equipment.name} from {booking.start_time} to {booking.end_time}.",
                    requires_confirmation=True
                )

            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        
        except Exception as e:
            print(f"Error during booking creation: {e}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['put'])
    def confirm(self, request, pk=None):
        booking = self.get_object()
        booking.is_confirmed = True
        booking.save()

        # Notify user that booking is confirmed
        Notification.objects.create(
            user=booking.user,
            booking=booking,
            message=f"Your booking for {booking.equipment.name} from {booking.start_time} to {booking.end_time} has been confirmed.",
            requires_confirmation=False
        )

        serializer = self.get_serializer(booking)
        return Response(serializer.data)

class EquipmentViewSet(viewsets.ModelViewSet):
    queryset = Equipment.objects.all()
    serializer_class = EquipmentSerializer

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        
        # Converting dictionary to mutable
        data = request.data.copy()
        
        # If image is not in the request data, set it to the existing image
        if 'image' not in data:
            data['image'] = instance.image

        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

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

class LoginView(APIView):
    def post(self, request, format=None):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, email=email, password=password)
        if user is not None:
            login(request, user)
            refresh = RefreshToken.for_user(user)
            return Response({
                'token': str(refresh.access_token),
                'user_id': user.id,
                'user_type': user.user_type,
            }, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    def post(self, request, format=None):
        # Assuming JWT is managed client-side, simply return a success response
        logout(request)
        return Response(status=status.HTTP_200_OK)
