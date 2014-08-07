#!/bin/sh

cd .
kill `cat ./tmp/pids/faye.pid`
kill `cat ./tmp/pids/rails.pid`
rm ./tmp/pids/faye.pid
rm ./tmp/pids/rails.pid

exit 0