dir="$1"
snap="$dir/.snapshot.txt"

[ -d "$dir" ] || { echo "Directory not found!"; exit 1; }

ls "$dir" | sort > /tmp/newlist.txt

# First run: no snapshot file exists
if [ ! -f "$snap" ]; then
    cp /tmp/newlist.txt "$snap"
    echo "Snapshot created."
    exit 0
fi

echo "New files:"
comm -13 "$snap" /tmp/newlist.txt

echo "Missing files:"
comm -23 "$snap" /tmp/newlist.txt

# Update snapshot
cp /tmp/newlist.txt "$snap"
