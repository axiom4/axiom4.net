FROM python:3.11-alpine
# Setup user
RUN adduser -D -u 1000 -g 1000 -s /bin/sh www
# Install runtime dependencies
RUN apk add --no-cache nginx supervisor mariadb-connector-c
# Upgrade pip
RUN python -m pip install --upgrade pip
# Setup app
RUN mkdir -p /app
# Switch working environment
WORKDIR /app
# Add application
COPY axiom4-api/ .
# Install Python dependencies, then remove build deps in the same layer to reduce image size
RUN apk add --no-cache --virtual .build-deps gcc musl-dev libffi-dev pkgconf mariadb-dev mariadb-connector-c-dev \
    && python -m venv venv \
    && . ./venv/bin/activate \
    && pip install --no-cache-dir -r requirements.txt \
    && apk del .build-deps

# Fix permissions
RUN chown -R www:www /var/lib/nginx
# Copy configs
COPY config/supervisord.conf /etc/supervisord.conf
COPY config/supervisor.d /etc/supervisor.d

RUN mkdir -p /run/axiom4
RUN chown -R www:www /run/axiom4

EXPOSE 80
# Disable pycache
ENV PYTHONDONTWRITEBYTECODE=1

USER www
# Run supervisord
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]