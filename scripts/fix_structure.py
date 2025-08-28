import os
import shutil

# Define the expected structure with folders and files
expected_structure = {
    "src": {
        "features": {
            "landing": {
                "components": [
                    "PrimaryButton.jsx",
                    "FilterBar.jsx",
                    "FilterInput.jsx",
                    "ProfileCard.jsx"
                ],
                "assets": ["hero.webp"],
                "LandingPage.jsx": None,
                "landingPage.css": None  # optional
            }
        }
    }
}

# Base folder assumed to be current directory or adjust as needed
base_dir = "src"

def ensure_folder(path):
    if not os.path.exists(path):
        os.makedirs(path)

def move_file_if_exists(src_path, dest_path):
    if os.path.isfile(src_path):
        ensure_folder(os.path.dirname(dest_path))
        print(f"Moving {src_path} to {dest_path}...")
        shutil.move(src_path, dest_path)
        return True
    return False

def auto_fix_structure(base_path, structure, current_path=""):
    base_current_path = os.path.join(base_path, current_path)
    errors = []
    for key, value in structure.items():
        dest_path = os.path.join(base_current_path, key)
        if isinstance(value, dict):
            # Directory expected
            ensure_folder(dest_path)
            # Recurse into subfolder
            errors.extend(auto_fix_structure(base_path, value, os.path.join(current_path, key)))
        elif isinstance(value, list):
            # Folder with files expected
            ensure_folder(dest_path)
            for filename in value:
                # Look for misplaced file somewhere else in base_path tree
                # For safety, limit search to names only and move first found file
                found = False
                for root, dirs, files in os.walk(base_path):
                    if filename in files:
                        src_file = os.path.join(root, filename)
                        dest_file = os.path.join(dest_path, filename)
                        if src_file != dest_file:
                            moved = move_file_if_exists(src_file, dest_file)
                            if moved:
                                found = True
                                break
                if not found:
                    errors.append(f"Missing file or already correctly placed: {os.path.join(dest_path, filename)}")
        elif value is None:
            # Single file expected
            found = False
            for root, dirs, files in os.walk(base_path):
                if key in files:
                    src_file = os.path.join(root, key)
                    dest_file = os.path.join(base_current_path, key)
                    if src_file != dest_file:
                        moved = move_file_if_exists(src_file, dest_file)
                        if moved:
                            found = True
                            break
            if not found:
                errors.append(f"Missing file or already correctly placed: {os.path.join(base_current_path, key)}")
    return errors

# Run auto-fix for the expected structure
fix_errors = auto_fix_structure(base_dir, expected_structure["src"])

print("\nAuto-fix completed.")
if fix_errors:
    print("Warnings (some files might be missing or already correct):")
    for w in fix_errors:
        print("- " + w)
else:
    print("All files moved and correctly placed as per the expected structure.")

