#!/bin/sh

cd .
rackup faye.ru -s thin -E production & echo "$!" >> ./tmp/pids/faye.pid & rails s & echo "$!" >> ./tmp/pids/rails.pid & exit 0