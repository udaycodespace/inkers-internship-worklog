home="$HOME"

files=$(ls -A "$home"/.* 2>/dev/null | grep -v "/\.$" | grep -v "/\..\$" | grep -v "/\.$")

count=0
list=""

for f in $files; do
    [ -f "$f" ] && { count=$((count+1)); list="$list$(basename "$f")\n"; }
done

echo "Total hidden files: $count"
echo -e "$list"
