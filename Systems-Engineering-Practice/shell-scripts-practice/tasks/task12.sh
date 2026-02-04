echo -n "Enter directory path: "
read dir

[ -d "$dir" ] || { echo "Directory not found!"; exit 1; }

echo "Files:"
ls -p "$dir" | grep -v / || echo "No files"

echo "Directories:"
ls -p "$dir" | grep / || echo "No directories"

size=$(du -sk "$dir" | cut -f1)
echo "Total size: ${size} KB"
