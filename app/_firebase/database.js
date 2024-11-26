import { database } from './firebase';
import { ref, set, get, update, remove } from 'firebase/database';

// Database utility functions
export const writeData = async (path, data) => {
  try {
    await set(ref(database, path), data);
    return true;
  } catch (error) {
    console.error('Error writing to database:', error);
    throw error;
  }
};

export const readData = async (path) => {
  try {
    const snapshot = await get(ref(database, path));
    return snapshot.exists() ? snapshot.val() : null;
  } catch (error) {
    console.error('Error reading from database:', error);
    throw error;
  }
};

export const updateData = async (path, updates) => {
  try {
    await update(ref(database, path), updates);
    return true;
  } catch (error) {
    console.error('Error updating database:', error);
    throw error;
  }
};

export const deleteData = async (path) => {
  try {
    await remove(ref(database, path));
    return true;
  } catch (error) {
    console.error('Error deleting from database:', error);
    throw error;
  }
};
