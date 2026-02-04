d="$1"
word="$2"

if [ ! -d "$d" ]; then
    echo "Directory not found!"
    exit 1
fi

logs=$(ls "$d"/*.log 2>/dev/null)
[ -z "$logs" ] && { echo "No .log files found!"; exit 0; }

for f in $logs; do
    count=$(grep -c "$word" "$f")
    [ "$count" -gt 0 ] && echo "$f : $count matches"
done
