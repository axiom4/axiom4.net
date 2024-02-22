FROM python:3.11-alpine
# Setup usr
RUN adduser -D -u 1000 -g 1000 -s /bin/sh www
# Install dependencies
RUN apk add --no-cache --virtual build-deps gcc musl-dev libffi-dev pkgconf mariadb-dev mariadb-connector-c-dev    
# Install packages
RUN apk add --update --no-cache nginx supervisor
# Upgrade pip
RUN python -m pip install --upgrade pip
# Setup app
RUN mkdir -p /app
# Switch working environment
WORKDIR /app
# Add application
COPY axiom4-api/ .
# Install dependencies
RUN python -m venv venv
RUN source ./venv/bin/activate && pip install -r requirements.txt

# # Fix permissions
RUN chown -R www:www /var/lib/nginx
# # Copy configs
COPY config/supervisord.conf /etc/supervisord.conf
COPY config/supervisor.d /etc/supervisor.d

RUN mkdir -p /run/axiom4
RUN chown -R www:www /run/axiom4

# # COPY config/nginx.conf /etc/nginx/nginx.conf
# # Expose port the server is reachable on
EXPOSE 80
# # Disable pycache
ENV PYTHONDONTWRITEBYTECODE=1

# RUN apk del build-deps
USER supervisord
# # Run supervisord
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]