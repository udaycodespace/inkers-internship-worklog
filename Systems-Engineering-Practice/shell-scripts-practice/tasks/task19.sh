dir="$1"
[ -d "$dir" ] || { echo "Directory not found!"; exit 1; }

count=0

for f in "$dir"/*; do
    [ -f "$f" ] || continue
    name=$(basename "$f")
    new="${name// /_}"
    if [ "$name" != "$new" ]; then
        mv "$dir/$name" "$dir/$new"
        echo "$name -> $new"
        count=$((count+1))
    fi
done

[ "$count" -eq 0 ] && echo "No filenames with spaces found!"
