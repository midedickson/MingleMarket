import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from .models import Message
from django.contrib.auth.models import User
from .models import Contact
from .views import get_last_10_messages, get_user_contact, get_current_chat, get_online_users


class ChatConsumer(WebsocketConsumer):
    def fetch_messages(self, data):
        messages = get_last_10_messages(data['chatId'])
        content = {
            'command': 'messages',
            'messages': self.messages_to_json(messages)
        }
        self.send_message(content)

    def new_message(self, data):
        user_contact = get_user_contact(data['from'])
        self.user = data['from']
        print(self.user)
        if user_contact.online:
            pass
        else:
            user_contact.online = True
            user_contact.save()
        message = Message.objects.create(
            contact=user_contact, content=data['message'])
        current_chat = get_current_chat(data['chatId'])
        current_chat.messages.add(message)
        current_chat.save()
        content = {
            'command': 'new_message',
            'message': self.message_to_json(message)
        }

        return self.send_chat_message(content)

    def messages_to_json(self, messages):
        result = []
        for message in messages:
            result.append(self.message_to_json(message))
        return result

    def message_to_json(self, message):
        return {
            'id': message.id,
            'author': message.contact.user.username,
            'author_photo': message.contact.photo.url,
            'content': message.content,
            'timestamp': str(message.timestamp)
        }

    def online_users(self):
        users = Contact.objects.filter(online=True)
        content = {
            'command': 'online_users',
            'users': self.users_to_json(users)
        }
        self.send(text_data=content)

    def users_to_json(self, users):
        result = []
        for user in users:
            result.append(self.user_to_json(user))
        return result[:15]

    def user_to_json(self, user):
        return {
            'id': user.id,
            'contact_photo': user.contact_set.photo.url,
            'username': user.username,
        }

    commands = {
        'fetch_messages': fetch_messages,
        'new_message': new_message,
        'online_users': online_users
    }

    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name
        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        # contact = get_user_contact(self.user)
        # contact.online = False
        # conatact.save()
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        data = json.loads(text_data)
        self.commands[data['command']](self, data)

    def send_chat_message(self, message):
        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    def send_message(self, message):
        self.send(text_data=json.dumps(message))

    # Receive message from room group
    def chat_message(self, event):
        message = event['message']

        # Send message to WebSocket
        self.send(text_data=json.dumps(message))
