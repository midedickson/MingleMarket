from django.db import models
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.db.models.signals import post_save


def upload_path(instance, filename):
    return '/'.join(['profile_photo', str(instance.user), filename])


class Contact(models.Model):
    user = models.OneToOneField(
        User, related_name='contact', on_delete=models.CASCADE)

    photo = models.ImageField(
        serialize=True, null=True, blank=True, upload_to=upload_path)
    first_name = models.CharField(max_length=20, null=True, blank=True)
    last_name = models.CharField(max_length=20, null=True, blank=True)
    phone_number = models.CharField(max_length=15, null=True, blank=True)
    bio = models.TextField(max_length=1500, default='I am on Mingle Market!')
    catch_phrase = models.CharField(
        max_length=100, default='P.S I have no special talent, I\'m just passionately curious')
    warning = models.BooleanField(default=False)
    online = models.BooleanField(default=True)

    def __str__(self):
        return self.user.username


@receiver(post_save, sender=User)
def create_user_contact(sender, instance, created, **kwargs):
    if created:
        Contact.objects.create(user=instance)


class Message(models.Model):
    contact = models.ForeignKey(
        Contact, related_name='author_messages', on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.contact.user.username


class Chat(models.Model):
    name = models.CharField(max_length=100, default='Private Chat')
    participants = models.ManyToManyField(Contact, related_name='chats')
    messages = models.ManyToManyField(Message, blank=True)

    def __str__(self):
        return self.name


@receiver(post_save, sender=Contact)
def add_contact_to_chat(sender, instance, created, **kwargs):
    general_group = Chat.objects.get(name='Public Chat Room')
    if created:
        general_group.participants.add(instance)


class Animation(models.Model):
    startConfetti = models.CharField(max_length=3, null=True, blank=True)
    confettiType = models.IntegerField()
    bgColor = models.CharField(max_length=15, null=True, blank=True)
