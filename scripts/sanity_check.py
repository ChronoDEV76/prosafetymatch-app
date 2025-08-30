import os
import re

# Root of your entire project to scan
project_root = os.path.abspath(".")

# File extensions to check for React/Vite projects
file_extensions = [".js", ".jsx", ".ts", ".tsx"]

# React component filename pattern (PascalCase)
component_name_regex = re.compile(r"^[A-Z][A-Za-z0-9]+(\.jsx?|\.tsx?)$")

# Regex for import paths
import_regex = re.compile(r"""import\s+.*?from\s+['"](.*?)['"]""")

def read_file_content(filepath):
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            return f.read()
    except Exception:
        return None

def is_react_component_file(filename, content):
    """Heuristic: file looks like React component by name and content"""
    if not component_name_regex.match(filename):
        return False
    # Check for React import or JSX return pattern
    if "React" in content or re.search(r"return\s*\(", content):
        return True
    return False

def check_file_structure(filepath):
    errors = []
    content = read_file_content(filepath)
    if content is None:
        errors.append("Failed to read file")
        return errors
    filename = os.path.basename(filepath)

    # Component files checks (only for .jsx and .tsx files)
    if filepath.endswith((".jsx", ".tsx")):
        if not component_name_regex.match(filename):
            errors.append(f"Component filename should be PascalCase, got '{filename}'")

        if is_react_component_file(filename, content):
            if not re.search(r"import\s+React", content):
                # React 17+ with new JSX runtime may not need import React; adjust accordingly if needed
                pass  # optional warning can be added if needed

        if "export default" not in content:
            errors.append("Missing default export in component")

        # Component name vs filename check
        comp_name = os.path.splitext(filename)[0]
        name_match = re.search(r"function\s+([A-Z][A-Za-z0-9]*)\s*\(", content)
        if name_match and name_match.group(1) != comp_name:
            errors.append(f"Component name '{name_match.group(1)}' does not match filename '{comp_name}'")

    return errors

def check_import_paths(filepath, root_folder):
    errors = []
    content = read_file_content(filepath)
    if content is None:
        errors.append("Failed to read file for import check")
        return errors

    lines = content.splitlines()
    base_dir = os.path.dirname(os.path.abspath(filepath))
    root_abs = os.path.abspath(root_folder)

    for line_num, line in enumerate(lines, start=1):
        line = line.strip()
        match = import_regex.match(line)
        if match:
            import_path = match.group(1)

            # Skip bare module imports (react, react-router-dom, etc.)
            if not import_path.startswith("."):
                continue

            abs_import_path = os.path.abspath(os.path.join(base_dir, import_path))
            # Possible extensions and index files
            candidates = [
                abs_import_path,
                abs_import_path + ".js",
                abs_import_path + ".jsx",
                abs_import_path + ".ts",
                abs_import_path + ".tsx",
                os.path.join(abs_import_path, "index.js"),
                os.path.join(abs_import_path, "index.jsx"),
                os.path.join(abs_import_path, "index.ts"),
                os.path.join(abs_import_path, "index.tsx"),
            ]

            file_exists = False
            for candidate in candidates:
                if os.path.exists(candidate):
                    file_exists = True

                    # Normalize import path for redundancy check
                    norm_import_path = import_path.replace("\\", "/").rstrip("/")
                    norm_import_path_no_ext = re.sub(r"\.(js|jsx|ts|tsx)$", "", norm_import_path)

                    base_dir_parts = base_dir.replace("\\", "/").split("/")
                    relevant_dirs = base_dir_parts[-2:] if len(base_dir_parts) >= 2 else base_dir_parts
                    for folder in relevant_dirs:
                        if norm_import_path_no_ext.startswith(folder + "/") or norm_import_path_no_ext == folder:
                            if not import_path.startswith("../"):
                                errors.append(
                                    f"Suspicious import path '{import_path}' in {filepath}:{line_num}. "
                                    f"Redundant repetition of folder '{folder}' in path. Check import."
                                )
                                break

                    # Case sensitivity check per segment
                    rel_to_root = os.path.relpath(candidate, root_abs)
                    parts = rel_to_root.split(os.sep)
                    current_path = root_abs
                    for part in parts:
                        try:
                            actual_entries = os.listdir(current_path)
                        except FileNotFoundError:
                            errors.append(f"Path segment '{current_path}' missing, causing import fail at line {line_num}")
                            break
                        if part not in actual_entries:
                            matches = [entry for entry in actual_entries if entry.lower() == part.lower()]
                            if matches:
                                errors.append(
                                    f"Case mismatch for '{part}' in import '{import_path}' at {filepath}:{line_num}. Actual: '{matches[0]}'"
                                )
                            else:
                                errors.append(
                                    f"Import path '{import_path}' points to non-existent segment '{part}' at {filepath}:{line_num}"
                                )
                            break
                        current_path = os.path.join(current_path, part)
                    break

            if not file_exists:
                errors.append(f"Import path '{import_path}' does not resolve to a file/folder at {filepath}:{line_num}")

    return errors

def scan_project(root_folder):
    file_errors = {}
    for dirpath, _, filenames in os.walk(root_folder):
        for filename in filenames:
            if any(filename.endswith(ext) for ext in file_extensions):
                filepath = os.path.join(dirpath, filename)
                errors = []
                errors.extend(check_file_structure(filepath))
                errors.extend(check_import_paths(filepath, root_folder))
                if errors:
                    file_errors[filepath] = errors
    return file_errors

if __name__ == "__main__":
    results = scan_project(project_root)
    if results:
        print("Sanity check found issues:\n")
        for file_path, errs in results.items():
            print(file_path)
            for err in errs:
                print(f"  - {err}")
            print()
    else:
        print("All checked files have proper naming, placement, structure, and valid imports.")

