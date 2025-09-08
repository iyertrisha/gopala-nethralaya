#!/usr/bin/env python3
"""
Script to generate secure secrets for the hospital website application.
Run this script to generate a secure SECRET_KEY and other secrets.
"""

import secrets
import string
import os

def generate_secret_key():
    """Generate a Django SECRET_KEY"""
    return ''.join(secrets.choice(string.ascii_letters + string.digits + '!@#$%^&*()_+-=[]{}|;:,.<>?') for _ in range(50))

def generate_password(length=16):
    """Generate a secure password"""
    alphabet = string.ascii_letters + string.digits + '!@#$%^&*()_+-=[]{}|;:,.<>?'
    return ''.join(secrets.choice(alphabet) for _ in range(length))

def generate_database_password():
    """Generate a database password"""
    return generate_password(20)

def main():
    print("🔐 Hospital Website Security Configuration Generator")
    print("=" * 50)
    
    print("\n📋 Generated Secrets:")
    print("-" * 30)
    
    secret_key = generate_secret_key()
    db_password = generate_database_password()
    
    print(f"SECRET_KEY={secret_key}")
    print(f"DB_PASSWORD={db_password}")
    
    print("\n📝 Add these to your .env file:")
    print("-" * 30)
    print(f"SECRET_KEY={secret_key}")
    print(f"DB_PASSWORD={db_password}")
    
    print("\n⚠️  Security Reminders:")
    print("-" * 30)
    print("1. Never commit .env files to version control")
    print("2. Use different passwords for development and production")
    print("3. Store production secrets in AWS Secrets Manager")
    print("4. Regularly rotate passwords and API keys")
    print("5. Enable HTTPS in production")
    
    print("\n✅ Your application is now more secure!")

if __name__ == "__main__":
    main()
