import * as SecureStore from 'expo-secure-store';

// Save data to Secure Store
export const saveToSecureStore = async (key, value) => {
  try {
    await SecureStore.setItemAsync(key, value);
    console.log(`Data saved to Secure Store: ${key}`);
  } catch (error) {
    console.error(`Failed to save data to Secure Store: ${key}`, error);
  }
};

// Retrieve data from Secure Store
export const getFromSecureStore = async (key) => {
  try {
    const value = await SecureStore.getItemAsync(key);
    console.log(`Data retrieved from Secure Store: ${key} = ${value}`);
    return value;
  } catch (error) {
    console.error(`Failed to retrieve data from Secure Store: ${key}`, error);
    return null;
  }
};

// Delete data from Secure Store
export const deleteFromSecureStore = async (key) => {
  try {
    await SecureStore.deleteItemAsync(key);
    console.log(`Data deleted from Secure Store: ${key}`);
  } catch (error) {
    console.error(`Failed to delete data from Secure Store: ${key}`, error);
  }
};
