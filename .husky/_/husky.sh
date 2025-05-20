#!/bin/sh
if [ -z "$husky_skip_init" ]; then
  debug () {
    [ "$HUSKY_DEBUG" = "1" ] && echo "husky: $*"
  }
  husky_dir="$(dirname "$0")/.."
  while [ -h "$husky_dir" ]; do
    husky_dir="$(cd -P "$(dirname "$husky_dir")" && pwd)"
  done
  if [ -z "$HUSKY" ]; then
    path="$husky_dir/bin"; export PATH="$path:$PATH"
  fi
  if [ -f "$husky_dir/.huskyrc" ]; then
    debug "reading .huskyrc"
    . "$husky_dir/.huskyrc"
  fi
  export husky_skip_init=1
fi

exec "$@"
