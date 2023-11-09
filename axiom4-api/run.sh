#!/bin/bash
export DEBUG=1
export SECRET_KEY="9tc^=7r@693w80oj=ry4@s^oo8tev0i&cj1s@9+5rqx0z@f&41"
export DJANGO_ALLOWED_HOSTS="localhost 127.0.0.1 [::1]"
export MYSQL_ROOT_PASSWORD=P@ssword1!
export MYSQL_DATABASE=axiom4.net
export MYSQL_USER=axiom4
export MYSQL_PASSWORD=axiom4
export MYSQL_PORT=3306
export MYSQL_HOST=127.0.0.1

./manage.py $@
