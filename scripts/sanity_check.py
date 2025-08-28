import os
import re

# Define the source root folder to scan
src_root = "src"

# File extensions to check for React/Vite projects
file_extensions = [".jsx", ".js", ".tsx", ".ts"]

# Common React/Vite sanity checks per file content
sanity_patterns = {
    "import React": "React must be imported in React components",
    "export default": "Component or module should have a default export",
    "(function|const|let|var)\\s+[A-Z]": "Component/function names should start with uppercase letter",
    "return \\(": "JSX return expected in React components",
    "import .+ from ['\"].+['\"]": "Valid JS import statement",
}

# Regex to detect import paths
import_regex = re.compile(r"""import\s+.*?from\s+['"](.*?)['"]""")

# Helper to read file content safely
def read_file_content(filepath):
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            return f.read()
    except Exception:
        return None

# Check basic React patterns
def check_file_sanity(filepath):
    errors = []
    content = read_file_content(filepath)
    if content is None:
        errors.append("Failed to read file contents")
        return errors

    for pattern, desc in sanity_patterns.items():
        if not re.search(pattern, content):
            errors.append(f"Missing or incorrect pattern: '{desc}'")

    return errors

# Check import path existence and relative correctness
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

            # Try possible extensions/folders for file existence
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

                    # Sanity check for relative path correctness:
                    # The import path should not redundantly include parent folders of
                    # the current file's directory. For example, from
                    # src/features/landing/LandingPage.jsx importing `./features/landing/components/...`
                    # is wrong because it goes deeper into an invalid subpath.

                    # Get relative path from base_dir to candidate
                    rel_path = os.path.relpath(candidate, base_dir)
                    # Simplify import_path (removing trailing slashes, extensions)
                    norm_import_path = import_path.replace("\\", "/").rstrip("/")

                    # Also try to normalize extensions for comparison
                    norm_import_path_no_ext = re.sub(r"\.(js|jsx|ts|tsx)$", "", norm_import_path)

                    # Check if norm_import_path incorrectly repeats parts of current dir path
                    # E.g. if current file is in src/features/landing and import starts with ./features/landing again
                    base_dir_parts = base_dir.replace("\\", "/").split("/")
                    # Take last two folder names of current file path for a heuristic
                    relevant_dirs = base_dir_parts[-2:] if len(base_dir_parts) >= 2 else base_dir_parts

                    # Check if import path includes those folders unnecessarily at start
                    for folder in relevant_dirs:
                        if norm_import_path_no_ext.startswith(folder + "/") or norm_import_path_no_ext.startswith(folder):
                            # But only error if import path does NOT start with "../" (which would go up)
                            if not import_path.startswith("../"):
                                errors.append(f"Suspicious import path '{import_path}' in {filepath}:{line_num}. "
                                              f"Seems to redundantly include '{folder}', which is parent folder of the current file. "
                                              f"Check relative import correctness.")
                                break

                    # Check case sensitivity per path segment relative to root
                    rel_to_root = os.path.relpath(candidate, root_abs)
                    parts = rel_to_root.split(os.sep)
                    current_path = root_abs

                    for part in parts:
                        try:
                            actual_entries = os.listdir(current_path)
                        except FileNotFoundError:
                            errors.append(f"Path segment '{current_path}' does not exist, causing failed import at {filepath}:{line_num}")
                            break

                        if part not in actual_entries:
                            # Case mismatch check (case-insensitive)
                            matches = [entry for entry in actual_entries if entry.lower() == part.lower()]
                            if matches:
                                errors.append(f"Case mismatch in import path near '{part}' in import '{import_path}' at {filepath}:{line_num}")
                            else:
                                errors.append(f"Import path '{import_path}' points to non-existent segment '{part}' at {filepath}:{line_num}")
                            break
                        current_path = os.path.join(current_path, part)
                    break
            if not file_exists:
                errors.append(f"Import path '{import_path}' does not resolve to any file or folder at {filepath}:{line_num}")

    return errors


def sanity_check_app(root_folder):
    file_errors = {}
    for dirpath, _, filenames in os.walk(root_folder):
        for filename in filenames:
            if any(filename.endswith(ext) for ext in file_extensions):
                filepath = os.path.join(dirpath, filename)
                errors = []
                errors.extend(check_file_sanity(filepath))
                errors.extend(check_import_paths(filepath, root_folder))
                if errors:
                    file_errors[filepath] = errors
    return file_errors


if __name__ == "__main__":
    results = sanity_check_app(src_root)
    if results:
        print("Sanity check found issues in the following files:\n")
        for file_path, errs in results.items():
            print(f"{file_path}:")
            for err in errs:
                print(f"  - {err}")
            print()
    else:
        print("Sanity check passed: React/Vite files have consistent code patterns, correct import paths, and no redundant relative path errors.")

