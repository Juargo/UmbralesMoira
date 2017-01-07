#!/bin/sh

curl -k "https://192.168.11.35/render/?target=$1&from=$2&until=$3&tz=$4&format=$5"
