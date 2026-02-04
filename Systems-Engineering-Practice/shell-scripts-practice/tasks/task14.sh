dir="$1"
[ -d "$dir" ] || { echo "Directory not found!"; exit 1; }

count=0

for f in "$dir"/*.sh; do
    [ -f "$f" ] || continue
    count=$((count+1))
    if [ ! -x "$f" ]; then
        chmod u+x "$f"
        echo "$(basename "$f") → made executable"
    else
        echo "$(basename "$f") → already executable"
    fi
done

[ "$count" -eq 0 ] && echo "No .sh files found!"
