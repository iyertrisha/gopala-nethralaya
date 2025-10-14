from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError

class Command(BaseCommand):
    help = 'Create an admin user for the hospital management system'

    def add_arguments(self, parser):
        parser.add_argument('--username', type=str, help='Admin username')
        parser.add_argument('--email', type=str, help='Admin email')
        parser.add_argument('--password', type=str, help='Admin password')
        parser.add_argument('--first-name', type=str, default='', help='Admin first name')
        parser.add_argument('--last-name', type=str, default='', help='Admin last name')

    def handle(self, *args, **options):
        username = options['username']
        email = options['email']
        password = options['password']
        first_name = options['first_name']
        last_name = options['last_name']

        if not all([username, email, password]):
            self.stdout.write(
                self.style.ERROR('Username, email, and password are required')
            )
            return

        # Check if user already exists
        if User.objects.filter(username=username).exists():
            self.stdout.write(
                self.style.ERROR(f'User with username "{username}" already exists')
            )
            return

        if User.objects.filter(email=email).exists():
            self.stdout.write(
                self.style.ERROR(f'User with email "{email}" already exists')
            )
            return

        try:
            # Create superuser
            user = User.objects.create_superuser(
                username=username,
                email=email,
                password=password,
                first_name=first_name,
                last_name=last_name
            )
            
            self.stdout.write(
                self.style.SUCCESS(
                    f'Successfully created admin user: {username}'
                )
            )
            self.stdout.write(
                self.style.SUCCESS(
                    f'Email: {email}'
                )
            )
            self.stdout.write(
                self.style.SUCCESS(
                    f'Is superuser: {user.is_superuser}'
                )
            )
            self.stdout.write(
                self.style.SUCCESS(
                    f'Is staff: {user.is_staff}'
                )
            )
            
        except ValidationError as e:
            self.stdout.write(
                self.style.ERROR(f'Validation error: {e}')
            )
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'Error creating user: {e}')
            )
