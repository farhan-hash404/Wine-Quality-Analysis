"""
template.py

Run this script to generate the wine-quality-project folder structure
inside the current directory.

Usage:
    python template.py
"""

import os

# List of directories to create (empty dirs need a placeholder or they just get created)
DIRECTORIES = [
    "wine-quality-project/backend/data",
    "wine-quality-project/backend/models",
    "wine-quality-project/backend/utils",
    "wine-quality-project/frontend/src/components",
    "wine-quality-project/frontend/src/pages",
    "wine-quality-project/frontend/src/charts",
]

# List of files to create (empty files)
FILES = [
    "wine-quality-project/backend/app.py",
    "wine-quality-project/backend/model.py",
    "wine-quality-project/backend/train.py",
    "wine-quality-project/backend/data/wine_quality.csv",
    "wine-quality-project/backend/models/wine_model.pkl",
    "wine-quality-project/backend/utils/analysis.py",
    "wine-quality-project/backend/utils/__init__.py",
    "wine-quality-project/backend/requirements.txt",
]


def create_structure():
    # Create directories
    for directory in DIRECTORIES:
        os.makedirs(directory, exist_ok=True)
        print(f"Created directory: {directory}")

    # Create empty files
    for file_path in FILES:
        # Ensure parent directory exists (in case FILES has paths not in DIRECTORIES)
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        if not os.path.exists(file_path):
            with open(file_path, "w") as f:
                pass  # create an empty file
            print(f"Created file: {file_path}")
        else:
            print(f"File already exists, skipping: {file_path}")

    print("\n✅ Project structure created successfully!")


if __name__ == "__main__":
    create_structure()