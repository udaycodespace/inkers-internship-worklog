echo -n "Enter project name: "
read project

# Check empty name
if [ -z "$project" ]; then
  echo "Project name cannot be empty!"
  exit 1
fi

# Check if directory already exists
if [ -d "$project" ]; then
  echo "Directory '$project' already exists!"
  exit 1
fi

# Create project structure
mkdir -p "$project"/{src,docs,tests}

# Create README with project name as first line
echo "$project" > "$project/README.md"

# Print full path
echo "Project created at: $(pwd)/$project"
