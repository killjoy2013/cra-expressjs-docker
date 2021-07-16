#!/bin/sh -eu
if [ -z "${TOOLBAR_COLOR:-}" ]; then
    TOOLBAR_COLOR_JSON=$(jq -n --arg toolbar_color 'red' '$toolbar_color')
else
    TOOLBAR_COLOR_JSON=$(jq -n --arg toolbar_color "$TOOLBAR_COLOR" '$toolbar_color')
fi
if [ -z "${CLIENT_ENVIRONMENT:-}" ]; then
    CLIENT_ENVIRONMENT_JSON=$(jq -n --arg client_environment 'development' '$client_environment')
else
    CLIENT_ENVIRONMENT_JSON=$(jq -n --arg client_environment "$CLIENT_ENVIRONMENT" '$client_environment')
fi

if [ -z "${SOCKET_TIMEOUT:-}" ]; then
    SOCKET_TIMEOUT_JSON=$(jq -n --arg socket_timeout 10000 '$socket_timeout')
else
    SOCKET_TIMEOUT_JSON=$(jq -n --arg socket_timeout "$SOCKET_TIMEOUT" '$socket_timeout')
fi

cat <<EOF
window.REACT_APP_TOOLBAR_COLOR=$TOOLBAR_COLOR_JSON;
window.REACT_APP_CLIENT_ENVIRONMENT = $CLIENT_ENVIRONMENT_JSON;
window.REACT_APP_SOCKET_TIMEOUT = $SOCKET_TIMEOUT_JSON;
EOF
