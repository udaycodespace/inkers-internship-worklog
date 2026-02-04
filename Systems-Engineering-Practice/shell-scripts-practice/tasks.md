<<<<<<< HEAD
# Systems Engineering Practice – Shell Scripting Tasks (1–20)
**Date Completed:** 09/12/2025

---

## 🔰 Short Intro — What is Shell & Shell Scripting
A **shell** is a command-line interface that lets you interact with your operating system using text commands. Examples: `bash`, `sh`, `zsh`.
A **shell script** is a plain text file containing a sequence of shell commands. Scripts automate repetitive tasks, manage files, process text, and glue tools together.

**Why use shell scripts?**
- Automate repetitive tasks
- Fast prototyping of system tasks
- Good for file/text processing and system admin jobs

**Advantages**
- Lightweight, available on most Unix-like systems
- Easy to call system utilities (grep, awk, sed, find, etc.)

**Disadvantages**
- Portability issues between shells/platforms
- Harder to maintain for large projects (use Python/Go for complex apps)

---

## ✏️ Editors: Nano vs Vim (quick guide)
### Nano (Beginner-friendly)
- Open a file: `nano task01.sh`
- Save: `Ctrl + O` then Enter
- Exit: `Ctrl + X`
- Simple, visible shortcuts, minimal modes

### Vim (Powerful, modal)
- Install (Ubuntu/Debian): `sudo apt-get update && sudo apt-get install -y vim`
- Open a file: `vim task02.sh`
- Modes:
  - **Normal** (default): navigate and issue commands
  - **Insert**: press `i` to enter, type text
  - **Command**: press `:` from Normal mode to run commands like `:wq`
- Essential commands:
  - `i` → insert mode
  - `Esc` → return to Normal mode
  - `:w` → write (save)
  - `:q` → quit
  - `:wq` or `ZZ` → save & quit
  - `:q!` → quit without saving
  - Movement: `h` `j` `k` `l`
- Vim learning tip: practice `i`, `Esc`, `:wq` until muscle memory forms.

---

## ▶️ How to run scripts: Examples

### Using Nano (example: Task 1)
1. Create/edit: `nano task01.sh`
2. Write your script, save `Ctrl+O`, exit `Ctrl+X`
3. Make executable: `chmod +x task01.sh`
4. Run: `./task01.sh /some/directory`

### Using Vim (Tasks 2–20 recommended workflow)
1. Open: `vim task02.sh`
2. Press `i` to insert, write script, `Esc` then `:wq` to save & quit
3. Make executable: `chmod +x task02.sh`
4. Run: `./task02.sh <args>`

---

## 🧰 Tech Stack
- **Shell / Bash** (scripts written for `bash`)
- **GNU coreutils** (`ls`, `cp`, `mv`, `stat`, `du`, `find`, etc.)
- **grep / awk / sed** for text processing
- **Linux (Ubuntu recommended)**
- **Editors:** Nano, Vim
- **Git & GitHub** for storing solutions

---

## 🔗 Solutions (links) — each task's answer on my GitHub
> Found here: https://github.com/udaycodespace/systems-engineering-practice/tree/main/shell-scripts-practice/tasks

### Tab 1 — Tasks 1–10 (questions + link)
________________________________________
**Task 1 – Basic Listing & Counting**  
**Question:**  
Write a script that:  
1. Takes one argument: a directory path.  
2. Prints:  
- Total number of items in that directory.  
- Number of files.  
- Number of sub-directories.  
3. If the directory does not exist, print a clear error message.  

**Example usage:** `./task1.sh /some/directory`  

**Solution (repo):**  
https://github.com/udaycodespace/systems-engineering-practice/blob/main/shell-scripts-practice/tasks/task01.sh
________________________________________
**Task 2 – File Info Helper**  
**Question:**  
Write a script that:  
1. Asks the user to enter a file name (can be with or without path).  
2. If the file exists, print: size (bytes), last modified time, permissions (symbolic).  
3. If the file does not exist, print a suitable message.  

**Solution (repo):**  
https://github.com/udaycodespace/systems-engineering-practice/blob/main/shell-scripts-practice/tasks/task02.sh
________________________________________
**Task 3 – Text File Backup**  
**Question:**  
Write a script that:  
1. Takes one argument: a directory path.  
2. Creates a new folder inside it named `backup_YYYYMMDD` (use current date).  
3. Copies all `.txt` files from the given directory into this backup folder.  
4. Prints how many files were copied.  

**Solution (repo):**  
https://github.com/udaycodespace/systems-engineering-practice/blob/main/shell-scripts-practice/tasks/task03.sh
________________________________________
**Task 4 – Top N Largest Files**  
**Question:**  
Write a script that:  
1. Takes two arguments: a directory path and a number N.  
2. Finds the N largest regular files inside that directory (non-recursive).  
3. Prints sizes and names in descending order.  
4. If N missing or not a number, handle the error.  

**Solution (repo):**  
https://github.com/udaycodespace/systems-engineering-practice/blob/main/shell-scripts-practice/tasks/task04.sh
________________________________________
**Task 5 – Simple Log Search**  
**Question:**  
Write a script that:  
1. Takes two arguments: directory path and a search word.  
2. Searches all `.log` files (non-recursive) for lines that contain the word.  
3. For every `.log` file with matches, print the file name and number of matching lines.  
4. If no `.log` files are found, print a message.  

**Solution (repo):**  
https://github.com/udaycodespace/systems-engineering-practice/blob/main/shell-scripts-practice/tasks/task05.sh
________________________________________
**Task 6 – Hidden Files Report**  
**Question:**  
Write a script that:  
1. Looks in the home directory of the current user.  
2. Lists all hidden files (not directories) directly inside it (non-recursive).  
3. Prints total number of hidden files and their names.  

**Solution (repo):**  
https://github.com/udaycodespace/systems-engineering-practice/blob/main/shell-scripts-practice/tasks/task06.sh
________________________________________
**Task 7 – Simple Change Tracker**  
**Question:**  
Write a script that:  
1. Takes one argument: a directory path.  
2. Creates/updates `.snapshot.txt` with the list of files (non-recursive, one per line).  
3. On next run, compares current list and prints new/missing files.  
4. After printing, update `.snapshot.txt`.  

**Solution (repo):**  
https://github.com/udaycodespace/systems-engineering-practice/blob/main/shell-scripts-practice/tasks/task07.sh
________________________________________
**Task 8 – Basic Symlink Checker**  
**Question:**  
Write a script that:  
1. Takes a directory path.  
2. Lists all symbolic links directly inside that directory.  
3. For each symlink, prints whether it points to valid or missing target.  

**Solution (repo):**  
https://github.com/udaycodespace/systems-engineering-practice/blob/main/shell-scripts-practice/tasks/task08.sh
________________________________________
**Task 9 – Space Threshold Action**  
**Question:**  
Write a script that:  
1. Takes a directory path.  
2. Calculates total size (MB) of that directory (non-recursive).  
3. If size > threshold (e.g. 100MB): print warning + create `size_warning.txt` with date and size. Else print OK.  

**Solution (repo):**  
https://github.com/udaycodespace/systems-engineering-practice/blob/main/shell-scripts-practice/tasks/task09.sh
________________________________________
**Task 10 – Simple File Type Classifier (By Extension)**  
**Question:**  
Write a script that:  
1. Takes a directory path.  
2. For each item (non-recursive) if it is a file, check extension and count files per extension.  
3. Print summary like `txt: 5 files`, `sh: 3 files`, `no extension: 2 files`.  

**Solution (repo):**  
https://github.com/udaycodespace/systems-engineering-practice/blob/main/shell-scripts-practice/tasks/task10.sh
________________________________________

### Tab 2 — Tasks 11–20 (questions + links)
________________________________________
**Task 11 – Project Workspace Initializer (Create)**  
**Question:**  
Write a script that:  
1. Asks the user for a project name.  
2. Creates a directory with that name in the current directory.  
3. Inside it, creates `src/`, `docs/`, `tests/`.  
4. Creates empty `README.md` and writes project name as first line.  
5. Prints full path of the project dir.  

**Solution (repo):**  
https://github.com/udaycodespace/systems-engineering-practice/blob/main/shell-scripts-practice/tasks/task11.sh
________________________________________
**Task 12 – Directory Content Viewer (Read)**  
**Question:**  
Write a script that:  
1. Asks for a directory path.  
2. If exists, print list of files and list of sub-directories (non-recursive).  
3. Show total size (KB) of files directly inside (non-recursive).  
4. If not exists, print error message.  

**Solution (repo):**  
https://github.com/udaycodespace/systems-engineering-practice/blob/main/shell-scripts-practice/tasks/task12.sh
________________________________________
**Task 13 – Bulk Rename with Prefix (Update)**  
**Question:**  
Write a script that:  
1. Takes directory path and a prefix string.  
2. For every regular file directly inside, rename by adding prefix.  
3. Print old name → new name for each.  
4. Handle missing directory or no regular files.  

**Solution (repo):**  
https://github.com/udaycodespace/systems-engineering-practice/blob/main/shell-scripts-practice/tasks/task13.sh
________________________________________
**Task 14 – Permissions Updater for Scripts (Update)**  
**Question:**  
Write a script that:  
1. Takes directory path.  
2. For every `.sh` directly inside, if not executable add `u+x`.  
3. Print name and whether changed or left as-is.  
4. Handle missing directory or no `.sh` files.  

**Solution (repo):**  
https://github.com/udaycodespace/systems-engineering-practice/blob/main/shell-scripts-practice/tasks/task14.sh
________________________________________
**Task 15 – Safe Cleaner with Delete Log (Delete)**  
**Question:**  
Write a script that:  
1. Takes a directory path.  
2. Creates (if missing) `delete_log.txt` inside it.  
3. Shows list of `.tmp` files (non-recursive).  
4. Ask user `Do you want to delete all these .tmp files? (yes/no)`.  
 - If `yes`: delete & log each filename + date/time in `delete_log.txt`.  
 - Else: do nothing.  
5. If no `.tmp` files, print message & exit.  

**Solution (repo):**  
https://github.com/udaycodespace/systems-engineering-practice/blob/main/shell-scripts-practice/tasks/task15.sh
________________________________________
**Task 16 – Recursive Extension Backup (Create/Read)**  
**Question:**  
Write a script that:  
1. Takes a directory path and a file extension (no dot).  
2. Creates `ext_backup/` in current dir if absent.  
3. Recursively searches the given dir for files with that extension.  
4. Copies all matches into `ext_backup/` (flat, only basename).  
5. Prints how many files were copied.  
Handle missing dir or no matches.

**Solution (repo):**  
https://github.com/udaycodespace/systems-engineering-practice/blob/main/shell-scripts-practice/tasks/task16.sh
________________________________________
**Task 17 – Recent Files Reporter (Read)**  
**Question:**  
Write a script that:  
1. Takes a directory path and a number of days N.  
2. Recursively finds files modified in last N days.  
3. Prints each file path + last modified time.  
4. Print total count.  
Handle missing/invalid N or no files found.

**Solution (repo):**  
https://github.com/udaycodespace/systems-engineering-practice/blob/main/shell-scripts-practice/tasks/task17.sh
________________________________________
**Task 18 – Merge Text Files (Create/Read)**  
**Question:**  
Write a script that:  
1. Takes a directory path.  
2. Finds `.txt` files directly inside (non-recursive).  
3. Creates `combined.txt` inside that directory.  
4. For each `.txt` file in alphabetical order: write header `===== FILENAME =====` then append content.  
5. At end print size (bytes) of `combined.txt`.  
If no `.txt`, print message and do NOT create `combined.txt`.

**Solution (repo):**  
https://github.com/udaycodespace/systems-engineering-practice/blob/main/shell-scripts-practice/tasks/task18.sh
________________________________________
**Task 19 – Whitespace Renamer (Update)**  
**Question:**  
Write a script that:  
1. Takes a directory path.  
2. For every regular file directly inside whose name contains spaces, rename spaces to underscores.  
3. Print changes `old_name -> new_name`.  
4. If none found, print message.  
Be careful not to modify directories.

**Solution (repo):**  
https://github.com/udaycodespace/systems-engineering-practice/blob/main/shell-scripts-practice/tasks/task19.sh
________________________________________
**Task 20 – Note Manager Using a Directory (CRUD)**  
**Question:**  
Write a script that manages notes using `notes/` in current folder with a menu:  
1. Create a new note (title → filename, save one line content)  
2. List all notes  
3. View a note  
4. Delete a note  
5. Exit

**Solution (repo):**  
https://github.com/udaycodespace/systems-engineering-practice/blob/main/shell-scripts-practice/tasks/task20.sh
________________________________________

## ✅ How I ran Task 1 & Task 2 (short reproducible steps)
**Task 1 (using Nano):**
```bash
# open in nano
nano task01.sh
# write script, save Ctrl+O, exit Ctrl+X
chmod +x task01.sh
./task01.sh /home/uday
```

**Task 2 (using Vim):**
```bash
vim task02.sh
# press i, write script, Esc, :wq
chmod +x task02.sh
./task02.sh
```

---

## 📌 Final notes
- All task solutions are linked above (01 → 20).  
- Tech stack, editor instructions, install commands, and shortcuts included.  
- Completed on **09/12/2025**.

---
=======
# Systems Engineering Practice – Shell Scripting Tasks (1–20)
**Date Completed:** 09/12/2025

---

## 🔰 Short Intro — What is Shell & Shell Scripting
A **shell** is a command-line interface that lets you interact with your operating system using text commands. Examples: `bash`, `sh`, `zsh`.
A **shell script** is a plain text file containing a sequence of shell commands. Scripts automate repetitive tasks, manage files, process text, and glue tools together.

**Why use shell scripts?**
- Automate repetitive tasks
- Fast prototyping of system tasks
- Good for file/text processing and system admin jobs

**Advantages**
- Lightweight, available on most Unix-like systems
- Easy to call system utilities (grep, awk, sed, find, etc.)

**Disadvantages**
- Portability issues between shells/platforms
- Harder to maintain for large projects (use Python/Go for complex apps)

---

## ✏️ Editors: Nano vs Vim (quick guide)
### Nano (Beginner-friendly)
- Open a file: `nano task01.sh`
- Save: `Ctrl + O` then Enter
- Exit: `Ctrl + X`
- Simple, visible shortcuts, minimal modes

### Vim (Powerful, modal)
- Install (Ubuntu/Debian): `sudo apt-get update && sudo apt-get install -y vim`
- Open a file: `vim task02.sh`
- Modes:
  - **Normal** (default): navigate and issue commands
  - **Insert**: press `i` to enter, type text
  - **Command**: press `:` from Normal mode to run commands like `:wq`
- Essential commands:
  - `i` → insert mode
  - `Esc` → return to Normal mode
  - `:w` → write (save)
  - `:q` → quit
  - `:wq` or `ZZ` → save & quit
  - `:q!` → quit without saving
  - Movement: `h` `j` `k` `l`
- Vim learning tip: practice `i`, `Esc`, `:wq` until muscle memory forms.

---

## ▶️ How to run scripts: Examples

### Using Nano (example: Task 1)
1. Create/edit: `nano task01.sh`
2. Write your script, save `Ctrl+O`, exit `Ctrl+X`
3. Make executable: `chmod +x task01.sh`
4. Run: `./task01.sh /some/directory`

### Using Vim (Tasks 2–20 recommended workflow)
1. Open: `vim task02.sh`
2. Press `i` to insert, write script, `Esc` then `:wq` to save & quit
3. Make executable: `chmod +x task02.sh`
4. Run: `./task02.sh <args>`

---

## 🧰 Tech Stack
- **Shell / Bash** (scripts written for `bash`)
- **GNU coreutils** (`ls`, `cp`, `mv`, `stat`, `du`, `find`, etc.)
- **grep / awk / sed** for text processing
- **Linux (Ubuntu recommended)**
- **Editors:** Nano, Vim
- **Git & GitHub** for storing solutions

---

## 🔗 Solutions (links) — each task's answer on your GitHub
> Pattern used: https://github.com/udaycodespace/systems-engineering-practice/blob/main/shell-scripts-practice/tasks/taskXX.sh
(XX is 01..20)

### Tab 1 — Tasks 1–10 (questions + link)
________________________________________
**Task 1 – Basic Listing & Counting**  
**Question:**  
Write a script that:  
1. Takes one argument: a directory path.  
2. Prints:  
- Total number of items in that directory.  
- Number of files.  
- Number of sub-directories.  
3. If the directory does not exist, print a clear error message.  

**Example usage:** `./task1.sh /some/directory`  

**Solution (repo):**  
https://github.com/udaycodespace/systems-engineering-practice/blob/main/shell-scripts-practice/tasks/task01.sh
________________________________________
**Task 2 – File Info Helper**  
**Question:**  
Write a script that:  
1. Asks the user to enter a file name (can be with or without path).  
2. If the file exists, print: size (bytes), last modified time, permissions (symbolic).  
3. If the file does not exist, print a suitable message.  

**Solution (repo):**  
https://github.com/udaycodespace/systems-engineering-practice/blob/main/shell-scripts-practice/tasks/task02.sh
________________________________________
**Task 3 – Text File Backup**  
**Question:**  
Write a script that:  
1. Takes one argument: a directory path.  
2. Creates a new folder inside it named `backup_YYYYMMDD` (use current date).  
3. Copies all `.txt` files from the given directory into this backup folder.  
4. Prints how many files were copied.  

**Solution (repo):**  
https://github.com/udaycodespace/systems-engineering-practice/blob/main/shell-scripts-practice/tasks/task03.sh
________________________________________
**Task 4 – Top N Largest Files**  
**Question:**  
Write a script that:  
1. Takes two arguments: a directory path and a number N.  
2. Finds the N largest regular files inside that directory (non-recursive).  
3. Prints sizes and names in descending order.  
4. If N missing or not a number, handle the error.  

**Solution (repo):**  
https://github.com/udaycodespace/systems-engineering-practice/blob/main/shell-scripts-practice/tasks/task04.sh
________________________________________
**Task 5 – Simple Log Search**  
**Question:**  
Write a script that:  
1. Takes two arguments: directory path and a search word.  
2. Searches all `.log` files (non-recursive) for lines that contain the word.  
3. For every `.log` file with matches, print the file name and number of matching lines.  
4. If no `.log` files are found, print a message.  

**Solution (repo):**  
https://github.com/udaycodespace/systems-engineering-practice/blob/main/shell-scripts-practice/tasks/task05.sh
________________________________________
**Task 6 – Hidden Files Report**  
**Question:**  
Write a script that:  
1. Looks in the home directory of the current user.  
2. Lists all hidden files (not directories) directly inside it (non-recursive).  
3. Prints total number of hidden files and their names.  

**Solution (repo):**  
https://github.com/udaycodespace/systems-engineering-practice/blob/main/shell-scripts-practice/tasks/task06.sh
________________________________________
**Task 7 – Simple Change Tracker**  
**Question:**  
Write a script that:  
1. Takes one argument: a directory path.  
2. Creates/updates `.snapshot.txt` with the list of files (non-recursive, one per line).  
3. On next run, compares current list and prints new/missing files.  
4. After printing, update `.snapshot.txt`.  

**Solution (repo):**  
https://github.com/udaycodespace/systems-engineering-practice/blob/main/shell-scripts-practice/tasks/task07.sh
________________________________________
**Task 8 – Basic Symlink Checker**  
**Question:**  
Write a script that:  
1. Takes a directory path.  
2. Lists all symbolic links directly inside that directory.  
3. For each symlink, prints whether it points to valid or missing target.  

**Solution (repo):**  
https://github.com/udaycodespace/systems-engineering-practice/blob/main/shell-scripts-practice/tasks/task08.sh
________________________________________
**Task 9 – Space Threshold Action**  
**Question:**  
Write a script that:  
1. Takes a directory path.  
2. Calculates total size (MB) of that directory (non-recursive).  
3. If size > threshold (e.g. 100MB): print warning + create `size_warning.txt` with date and size. Else print OK.  

**Solution (repo):**  
https://github.com/udaycodespace/systems-engineering-practice/blob/main/shell-scripts-practice/tasks/task09.sh
________________________________________
**Task 10 – Simple File Type Classifier (By Extension)**  
**Question:**  
Write a script that:  
1. Takes a directory path.  
2. For each item (non-recursive) if it is a file, check extension and count files per extension.  
3. Print summary like `txt: 5 files`, `sh: 3 files`, `no extension: 2 files`.  

**Solution (repo):**  
https://github.com/udaycodespace/systems-engineering-practice/blob/main/shell-scripts-practice/tasks/task10.sh
________________________________________

### Tab 2 — Tasks 11–20 (questions + links)
________________________________________
**Task 11 – Project Workspace Initializer (Create)**  
**Question:**  
Write a script that:  
1. Asks the user for a project name.  
2. Creates a directory with that name in the current directory.  
3. Inside it, creates `src/`, `docs/`, `tests/`.  
4. Creates empty `README.md` and writes project name as first line.  
5. Prints full path of the project dir.  

**Solution (repo):**  
https://github.com/udaycodespace/systems-engineering-practice/blob/main/shell-scripts-practice/tasks/task11.sh
________________________________________
**Task 12 – Directory Content Viewer (Read)**  
**Question:**  
Write a script that:  
1. Asks for a directory path.  
2. If exists, print list of files and list of sub-directories (non-recursive).  
3. Show total size (KB) of files directly inside (non-recursive).  
4. If not exists, print error message.  

**Solution (repo):**  
https://github.com/udaycodespace/systems-engineering-practice/blob/main/shell-scripts-practice/tasks/task12.sh
________________________________________
**Task 13 – Bulk Rename with Prefix (Update)**  
**Question:**  
Write a script that:  
1. Takes directory path and a prefix string.  
2. For every regular file directly inside, rename by adding prefix.  
3. Print old name → new name for each.  
4. Handle missing directory or no regular files.  

**Solution (repo):**  
https://github.com/udaycodespace/systems-engineering-practice/blob/main/shell-scripts-practice/tasks/task13.sh
________________________________________
**Task 14 – Permissions Updater for Scripts (Update)**  
**Question:**  
Write a script that:  
1. Takes directory path.  
2. For every `.sh` directly inside, if not executable add `u+x`.  
3. Print name and whether changed or left as-is.  
4. Handle missing directory or no `.sh` files.  

**Solution (repo):**  
https://github.com/udaycodespace/systems-engineering-practice/blob/main/shell-scripts-practice/tasks/task14.sh
________________________________________
**Task 15 – Safe Cleaner with Delete Log (Delete)**  
**Question:**  
Write a script that:  
1. Takes a directory path.  
2. Creates (if missing) `delete_log.txt` inside it.  
3. Shows list of `.tmp` files (non-recursive).  
4. Ask user `Do you want to delete all these .tmp files? (yes/no)`.  
 - If `yes`: delete & log each filename + date/time in `delete_log.txt`.  
 - Else: do nothing.  
5. If no `.tmp` files, print message & exit.  

**Solution (repo):**  
https://github.com/udaycodespace/systems-engineering-practice/blob/main/shell-scripts-practice/tasks/task15.sh
________________________________________
**Task 16 – Recursive Extension Backup (Create/Read)**  
**Question:**  
Write a script that:  
1. Takes a directory path and a file extension (no dot).  
2. Creates `ext_backup/` in current dir if absent.  
3. Recursively searches the given dir for files with that extension.  
4. Copies all matches into `ext_backup/` (flat, only basename).  
5. Prints how many files were copied.  
Handle missing dir or no matches.

**Solution (repo):**  
https://github.com/udaycodespace/systems-engineering-practice/blob/main/shell-scripts-practice/tasks/task16.sh
________________________________________
**Task 17 – Recent Files Reporter (Read)**  
**Question:**  
Write a script that:  
1. Takes a directory path and a number of days N.  
2. Recursively finds files modified in last N days.  
3. Prints each file path + last modified time.  
4. Print total count.  
Handle missing/invalid N or no files found.

**Solution (repo):**  
https://github.com/udaycodespace/systems-engineering-practice/blob/main/shell-scripts-practice/tasks/task17.sh
________________________________________
**Task 18 – Merge Text Files (Create/Read)**  
**Question:**  
Write a script that:  
1. Takes a directory path.  
2. Finds `.txt` files directly inside (non-recursive).  
3. Creates `combined.txt` inside that directory.  
4. For each `.txt` file in alphabetical order: write header `===== FILENAME =====` then append content.  
5. At end print size (bytes) of `combined.txt`.  
If no `.txt`, print message and do NOT create `combined.txt`.

**Solution (repo):**  
https://github.com/udaycodespace/systems-engineering-practice/blob/main/shell-scripts-practice/tasks/task18.sh
________________________________________
**Task 19 – Whitespace Renamer (Update)**  
**Question:**  
Write a script that:  
1. Takes a directory path.  
2. For every regular file directly inside whose name contains spaces, rename spaces to underscores.  
3. Print changes `old_name -> new_name`.  
4. If none found, print message.  
Be careful not to modify directories.

**Solution (repo):**  
https://github.com/udaycodespace/systems-engineering-practice/blob/main/shell-scripts-practice/tasks/task19.sh
________________________________________
**Task 20 – Note Manager Using a Directory (CRUD)**  
**Question:**  
Write a script that manages notes using `notes/` in current folder with a menu:  
1. Create a new note (title → filename, save one line content)  
2. List all notes  
3. View a note  
4. Delete a note  
5. Exit

**Solution (repo):**  
https://github.com/udaycodespace/systems-engineering-practice/blob/main/shell-scripts-practice/tasks/task20.sh
________________________________________

## ✅ How I ran Task 1 & Task 2 (short reproducible steps)
**Task 1 (using Nano):**
```bash
# open in nano
nano task01.sh
# write script, save Ctrl+O, exit Ctrl+X
chmod +x task01.sh
./task01.sh /home/uday
```

**Task 2 (using Vim):**
```bash
vim task02.sh
# press i, write script, Esc, :wq
chmod +x task02.sh
./task02.sh
```

---

## 📌 Final notes
- All task solutions are linked above (01 → 20).  
- Tech stack, editor instructions, install commands, and shortcuts included.  
- Completed on **09/12/2025**.

---
>>>>>>> 6f13368 (Add Docker practice notes and documentation (10/12/2025))
