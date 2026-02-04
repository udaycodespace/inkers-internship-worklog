#!/bin/bash

mkdir -p notes

while true; do
    echo "1. Create a new note"
    echo "2. List all notes"
    echo "3. View a note"
    echo "4. Delete a note"
    echo "5. Exit"
    read -p "Choose: " choice

    case "$choice" in
        1)
            read -p "Note title: " title
            file="notes/$title.txt"
            read -p "Enter note text: " line
            echo "$line" > "$file"
            echo "Saved $file"
            ;;
        2)
            if [ "$(ls -A notes)" ]; then
                echo "Notes:"
                ls notes
            else
                echo "No notes yet"
            fi
            ;;
        3)
            read -p "Note file name (e.g. title.txt): " name
            file="notes/$name"
            if [ -f "$file" ]; then
                echo "---- $name ----"
                cat "$file"
            else
                echo "Note not found"
            fi
            ;;
        4)
            read -p "Note file name to delete: " name
            file="notes/$name"
            if [ -f "$file" ]; then
                rm "$file"
                echo "Deleted $name"
            else
                echo "Note not found"
            fi
            ;;
        5)
            echo "Bye"
            break
            ;;
        *)
            echo "Invalid choice"
            ;;
    esac
done

