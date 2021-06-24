#!/bin/sh -eu
 echo "starting docker entrypoint" >&1
/app/build/generate_config_js.sh >/app/build/env-config.js
node /app/build/server
echo "express started" >&1
