dir="$1"
[ -d "$dir" ] || { echo "Directory not found!"; exit 1; }

size=$(du -sm "$dir" | cut -f1)
th=100

if [ "$size" -gt "$th" ]; then
    echo "Warning: size is ${size}MB"
    date +"%Y-%m-%d %H:%M  Size: ${size}MB" > "$dir/size_warning.txt"
else
    echo "OK: size is ${size}MB"
fi
