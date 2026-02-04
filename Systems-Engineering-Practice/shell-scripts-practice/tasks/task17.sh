dir="$1"
days="$2"

[ -d "$dir" ] || { echo "Directory not found!"; exit 1; }
[[ "$days" =~ ^[0-9]+$ ]] || { echo "Days must be a number!"; exit 1; }

count=0

while IFS= read -r f; do
    ts=$(date -r "$f" "+%Y-%m-%d %H:%M:%S")
    echo "$f  →  $ts"
    count=$((count+1))
done < <(find "$dir" -type f -mtime "-$days")

[ "$count" -eq 0 ] && { echo "No files modified in last $days days."; exit 0; }

echo "Total: $count files"
