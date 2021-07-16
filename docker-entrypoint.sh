#!/bin/sh -eu
echo "starting docker entrypoint" >&1
/tmp/build/generate_config_js.sh >/tmp/build/env-config.js
PORT=8081 node /tmp/build/server
echo "express started" >&1
