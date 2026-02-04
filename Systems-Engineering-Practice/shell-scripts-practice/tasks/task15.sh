#!/bin/bash

dir="$1"

if [ -z "$dir" ]; then
  echo "Usage: $0 DIRECTORY"
  exit 1
fi

if [ ! -d "$dir" ]; then
  echo "Directory not found!"
  exit 1
fi

cd "$dir" || exit 1

set -- *.tmp
if [ "$1" = "*.tmp" ]; then
  echo "No .tmp files found!"
  exit 0
fi

echo "These .tmp files will be affected:"
for f in "$@"; do
  echo "$f"
done

echo "Do you want to delete all these .tmp files? (yes/no)"
read answer

if [ "$answer" != "yes" ]; then
  echo "Aborted. No files deleted."
  exit 0
fi

log="delete_log.txt"
touch "$log"

for f in "$@"; do
  if [ -f "$f" ]; then
    rm "$f"
    echo "$(date '+%Y-%m-%d %H:%M:%S') - Deleted: $f" >> "$log"
  fi
done

echo "All .tmp files deleted and logged in $log"

