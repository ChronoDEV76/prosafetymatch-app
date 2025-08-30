import os
import json

def scan_project_structure(base_path='.'):
    project_structure = {}
    for root, dirs, files in os.walk(base_path):
        # Skip hidden folders like .git or node_modules (optional)
        dirs[:] = [d for d in dirs if not d.startswith('.')]
        # Get relative path from base folder
        folder = os.path.relpath(root, base_path)
        project_structure[folder] = files
    return project_structure

if __name__ == '__main__':
    layout = scan_project_structure()
    # Pretty print the layout as JSON
    print(json.dumps(layout, indent=4))

