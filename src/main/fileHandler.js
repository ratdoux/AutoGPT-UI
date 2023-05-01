import { writeFile, readFile } from 'fs';
import { join } from 'path';

const settingsFilePath = join("./assets", 'settings.json');

function saveSettings(settings) {
    console.log('Saving settings...', settings);
  writeFile(settingsFilePath, JSON.stringify(settings), (err) => {
    if (err) {
      console.error('Error saving settings:', err);
    } else {
      console.log('Settings saved successfully');
    }
  });
}

function loadSettings(callback) {
  readFile(settingsFilePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.log('Settings file not found. Using default settings.');
        callback([]);
      } else {
        console.error('Error reading settings:', err);
      }
    } else {
      try {
        const settings = JSON.parse(data);
        console.log('Settings loaded successfully', settings)
        callback(settings);
      } catch (e) {
        console.error('Error parsing settings:', e);
      }
    }
  });
}

export { saveSettings, loadSettings };
