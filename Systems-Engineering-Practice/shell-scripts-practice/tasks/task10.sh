dir="$1"
[ -d "$dir" ] || { echo "Directory not found!"; exit 1; }

declare -A count

for f in "$dir"/*; do
    [ -f "$f" ] || continue
    ext="${f##*.}"
    [ "$ext" = "$f" ] && ext="no extension"
    count["$ext"]=$(( ${count["$ext"]} + 1 ))
done

for e in "${!count[@]}"; do
    echo "$e: ${count[$e]} files"
done
