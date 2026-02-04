dir="$1"
ext="$2"

[ -d "$dir" ] || { echo "Directory not found!"; exit 1; }
[ -z "$ext" ] && { echo "Extension missing!"; exit 1; }

mkdir -p ext_backup

count=0

for f in $(find "$dir" -type f -name "*.$ext"); do
    cp "$f" "ext_backup/$(basename "$f")"
    count=$((count+1))
done

[ "$count" -eq 0 ] && { echo "No .$ext files found!"; exit 0; }

echo "Copied $count files."
