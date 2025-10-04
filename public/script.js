// Script to rename photos sequentially in a target folder.
// This script uses modern Node.js fs/promises for clean asynchronous operations.

import * as fs from 'fs/promises';
import * as path from 'path';

// --- CONFIGURATION ---
// IMPORTANT: Place this script *outside* the 'photos' folder,
// and make sure the 'photos' folder exists in the same directory as this script.
const PHOTO_DIR = './usPhotos';
const BASE_NAME = 'photo'; // The prefix for the new file names (e.g., 'photo' -> photo1.jpeg)

// List of file extensions the script should target
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
// ---------------------

/**
 * Renames photo files in a specified directory sequentially.
 */
async function renamePhotos() {
    console.log(`\n--- Starting Photo Renamer ---`);
    console.log(`Targeting directory: ${PHOTO_DIR}`);
    console.log(`New base name: ${BASE_NAME}\n`);

    try {
        // 1. Read the directory contents
        const files = await fs.readdir(PHOTO_DIR);

        // 2. Filter files to only include allowed photo extensions
        // .sort() is added to ensure files are processed in alphabetical order,
        // which helps if you want to maintain a specific order (e.g., based on filename or capture time).
        const photoFiles = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return ALLOWED_EXTENSIONS.includes(ext);
        }).sort();

        if (photoFiles.length === 0) {
            console.log("No photo files found with the specified extensions in the directory.");
            return;
        }

        console.log(`Found ${photoFiles.length} files to rename.\n`);

        // 3. Iterate and rename
        for (let i = 0; i < photoFiles.length; i++) {
            const originalName = photoFiles[i];
            const originalExt = path.extname(originalName); // Keep the original extension
            const newName = `${BASE_NAME}${i + 1}${originalExt}`; // e.g., photo1.jpeg, photo2.jpeg

            const oldPath = path.join(PHOTO_DIR, originalName);
            const newPath = path.join(PHOTO_DIR, newName);

            // Rename operation
            await fs.rename(oldPath, newPath);
            console.log(`Renamed: '${originalName}' -> '${newName}'`);
        }

        console.log("\n✅ Success! All photo files have been renamed.");

    } catch (error) {
        if (error.code === 'ENOENT') {
            // Handle case where the folder doesn't exist
            console.error(`\n❌ Error: Directory '${PHOTO_DIR}' not found.`);
            console.error(`Please make sure you have created the folder and placed your photos inside it.`);
        } else {
            console.error("\nAn unexpected error occurred during renaming:", error.message);
        }
    }
}

// Execute the main function
renamePhotos();