d="$1"
[ -d "$d" ] || { echo "Directory not found!"; exit 1; }

b="$d/backup_$(date +%Y%m%d)"
mkdir "$b"

cp "$d"/*.txt "$b" 2>/dev/null
echo "Copied $(ls "$b" | wc -l) files"
