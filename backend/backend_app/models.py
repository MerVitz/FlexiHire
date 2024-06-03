from django.contrib.auth.models import AbstractUser, BaseUserManager, Group
from django.db import models

##These are my models, they are 8 in number; Customuser, Equipment,
##Booking, Payment, Notification, Maintenance, Comment, Review,
## Any more that will bde added, ; MUST NOTE THE REASONS IN THE DOCUMENATION.

#1.
class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        
        customer_group, created = Group.objects.get_or_create(name='Customer')
        user.groups.add(customer_group)
        user.save(using=self._db)
        
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)
class CustomUser(AbstractUser):
    CUSTOMER = 'customer'
    ADMIN = 'admin'
    USER_TYPE_CHOICES = [
        (CUSTOMER, 'Customer'),
        (ADMIN, 'Admin')
    ]
    
    username=None
    email = models.EmailField(unique=True)
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES, default=CUSTOMER)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(null=True, blank=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']
    
    objects = CustomUserManager()
    
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='custom_user_set',
        blank=True,
        help_text='The groups this user belongs to.',
        verbose_name='groups'
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='custom_user_set',
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions'
    )
    
    def __str__(self):
        return self.email
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.user_type == self.ADMIN:
            self.groups.clear()
            admin_group, created = Group.objects.get_or_create(name='Admin')
            self.groups.add(admin_group)
        elif self.user_type == self.CUSTOMER:
            self.groups.clear()
            customer_group, created = Group.objects.get_or_create(name='Customer')
            self.groups.add(customer_group)
#2.
class Equipment(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=50)
    description = models.TextField()
    availability = models.BooleanField(default=True)
    price_per_day = models.DecimalField(max_digits=10, decimal_places=2)
    added_date = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='equipment_images/')

    def __str__(self):
        return self.name
    
#3.
class Booking(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    equipment = models.ForeignKey(Equipment, on_delete=models.CASCADE)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    status = models.CharField(max_length=50)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Booking by {self.user.username} for {self.equipment.name}'    
#4.
class Payment(models.Model):
    id = models.AutoField(primary_key=True)
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(max_length=50)
    status = models.CharField(max_length=50)
    transaction_id = models.CharField(max_length=100)
    payment_date = models.DateTimeField()

    def __str__(self):
        return f'Payment of {self.amount} for booking {self.booking.id}'
#5.
class Notification(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    message = models.TextField()
    read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Notification for {self.user.username}'
#6.
class Maintenance(models.Model):
    id = models.AutoField(primary_key=True)
    equipment = models.ForeignKey(Equipment, on_delete=models.CASCADE)
    issue_description = models.TextField()
    reported_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50)
    resolved_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f'Maintenance for {self.equipment.name}'
#7.
class Comment(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    equipment = models.ForeignKey(Equipment, on_delete=models.CASCADE)
    comment_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Comment by {self.user.username} on {self.equipment.name}'
#8.
class Review(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    equipment = models.ForeignKey(Equipment, on_delete=models.CASCADE)
    rating = models.IntegerField()
    review_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Review by {self.user.username} on {self.equipment.name} with rating {self.rating}'