from rest_framework import serializers
from chat.models import *
from chat.views import *


class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ('user', 'photo', 'first_name',
                  'last-name', 'phone_number', 'bio')


class ChatSerializer(serializers.ModelSerializer):
    participants = StringSerializer(many=True)

    class Meta:
        model = Chat
        fields = ('id', 'name', 'messages', 'participants')

    def create(self, validated_data):
        print(validated_data)
        participants = validated_data.pop('participants')
        chat = Chat()
        chat.save()
        for username in participants:
            contact = get_user_contact(username)
            chat.participants.add(contact)
        chat.save()
        return chat
