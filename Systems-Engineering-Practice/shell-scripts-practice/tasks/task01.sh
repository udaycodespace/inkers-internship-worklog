d="$1"

[ -d "$d" ] || { echo "Directory does not exist!"; exit 1; }

total=$(ls -A "$d" | wc -l)
files=$(find "$d" -maxdepth 1 -type f | wc -l)
dirs=$(($(find "$d" -maxdepth 1 -type d | wc -l) - 1))

echo "Total No. of items in this directory: $total"
echo "No. of Files: $files"
echo "No. of Sub-Directories: $dirs"
