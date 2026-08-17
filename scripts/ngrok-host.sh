#!/bin/sh
set -e

if [ ! -f .env ]; then
  echo "Missing .env — copy .env.example and set NGROK_AUTHTOKEN + NGROK_DOMAIN."
  exit 1
fi

set -a
# shellcheck disable=SC1091
. ./.env
set +a

if ! command -v ngrok >/dev/null 2>&1; then
  echo "ngrok CLI not found. Install from https://ngrok.com/download then run: ngrok config add-authtoken \$NGROK_AUTHTOKEN"
  exit 1
fi

if [ -z "$NGROK_DOMAIN" ]; then
  echo "Set NGROK_DOMAIN in .env"
  exit 1
fi

exec ngrok http 3000 --url="https://${NGROK_DOMAIN}"
