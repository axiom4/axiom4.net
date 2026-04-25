"""
WSGI config for axiom4 project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/wsgi/
"""

import os
from pathlib import Path

from dotenv import load_dotenv

from django.core.wsgi import get_wsgi_application

load_dotenv(Path(__file__).resolve().parent.parent / '.env', override=False)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'axiom4.settings')

application = get_wsgi_application()
