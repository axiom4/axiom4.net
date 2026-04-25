"""
ASGI config for axiom4 project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/asgi/
"""

import os
from pathlib import Path

from dotenv import load_dotenv

from django.core.asgi import get_asgi_application

load_dotenv(Path(__file__).resolve().parent.parent / '.env', override=False)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'axiom4.settings')

application = get_asgi_application()
