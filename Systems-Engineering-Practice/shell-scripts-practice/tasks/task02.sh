#!/bin/bash

read -p "Enter file name or full path: " file

if [ ! -e "$file" ]; then
    echo "File does not exist!"
    exit 1
fi

size=$(stat -c%s "$file")
mtime=$(stat -c%y "$file")
perms=$(stat -c%A "$file")

echo "File:          $file"
echo "Size (bytes):  $size"
echo "Last modified: $mtime"
echo "Permissions:   $perms"

