dir="$1"
pre="$2"

[ -d "$dir" ] || { echo "Directory not found!"; exit 1; }
[ -z "$pre" ] && { echo "Prefix missing!"; exit 1; }

count=0

for f in "$dir"/*; do
    [ -f "$f" ] || continue
    name=$(basename "$f")
    mv "$f" "$dir/$pre$name"
    echo "$name → $pre$name"
    count=$((count+1))
done

[ "$count" -eq 0 ] && echo "No regular files found!"
