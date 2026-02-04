dir="$1"
[ -d "$dir" ] || { echo "Directory not found!"; exit 1; }

txts=($(ls "$dir"/*.txt 2>/dev/null))
[ ${#txts[@]} -eq 0 ] && { echo "No .txt files found!"; exit 0; }

out="$dir/combined.txt"
> "$out"

for f in "${txts[@]}"; do
    name=$(basename "$f")
    echo "===== $name =====" >> "$out"
    cat "$f" >> "$out"
done

size=$(stat -c%s "$out")
echo "combined.txt size: $size bytes"
