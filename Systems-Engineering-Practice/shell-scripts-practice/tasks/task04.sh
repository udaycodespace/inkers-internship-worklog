d="$1"
n="$2"

if [ ! -d "$d" ]; then
    echo "Directory not found!"
    exit 1
fi

if ! [[ "$n" =~ ^[0-9]+$ ]]; then
    echo "N must be a number!"
    exit 1
fi

ls -lS "$d" | grep "^-" | head -n "$n"
