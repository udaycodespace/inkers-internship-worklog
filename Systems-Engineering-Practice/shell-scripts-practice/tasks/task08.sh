dir="$1"

[ -d "$dir" ] || { echo "Directory not found!"; exit 1; }

for f in "$dir"/*; do
    [ -L "$f" ] || continue
    if [ -e "$f" ]; then
        echo "$(basename "$f") → valid"
    else
        echo "$(basename "$f") → broken"
    fi
done
