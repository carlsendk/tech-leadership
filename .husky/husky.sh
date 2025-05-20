#!/bin/sh

if [ "$HUSKY" = 0 ]; then
  exit 0
fi

npm run --silent husky-init >/dev/null 2>&1 || true
