#!/usr/bin/env bash
kill -9 `cat api.pid` > /dev/null 2>&1;
sleep 2;

node $1 > /dev/null 2>&1 &
echo $! > api.pid

sleep 5;

curl -s -o /dev/null http://localhost:7865 ;

