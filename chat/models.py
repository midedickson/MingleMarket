from django.db import models
from django.contrib.auth.models import User


def upload_path(instance, filename):
    return '/'.join(['profile_photo', str(instance.user), filename])


class Contact(models.Model):
    user = models.ForeignKey(
        User, related_name='friends', on_delete=models.CASCADE)

    photo = models.ImageField(
        serialize=True, null=True, blank=True, upload_to=upload_path)
    first_name = models.CharField(max_length=20, null=True, blank=True)
    last_name = models.CharField(max_length=20, null=True, blank=True)
    phone_number = models.CharField(max_length=15, null=True, blank=True)
    bio = models.TextField(max_length=1500, default='I am on Mingle Market!')

    def __str__(self):
        return self.user.username


class Message(models.Model):
    contact = models.ForeignKey(
        Contact, related_name='author_messages', on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.contact.user.username


class Chat(models.Model):
    name = models.CharField(max_length=20, default='Private Chat')
    participants = models.ManyToManyField(Contact, related_name='chats')
    messages = models.ManyToManyField(Message, blank=True)

    def __str__(self):
        return self.name
