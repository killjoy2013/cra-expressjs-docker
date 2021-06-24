#!/bin/sh -eu
if [ -z "${TOOLBAR_COLOR:-}" ]; then
    TOOLBAR_COLOR_JSON=undefined
else
    TOOLBAR_COLOR_JSON=$(jq -n --arg toolbar_color "$TOOLBAR_COLOR" '$toolbar_color')
fi

cat <<EOF
window.REACT_APP_TOOLBAR_COLOR=$TOOLBAR_COLOR_JSON;
EOF
