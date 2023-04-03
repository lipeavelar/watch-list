import AsyncStorage from "@react-native-async-storage/async-storage";
import { APP_PREFERENCES } from "./storage-config";

export async function savePreferences(preferences: Preferences) {
  try {
    await AsyncStorage.setItem(APP_PREFERENCES, JSON.stringify(preferences));
  } catch (err) {
    throw err;
  }
}

export async function loadPreferences(): Promise<Preferences> {
  try {
    const storage = await AsyncStorage.getItem(APP_PREFERENCES);

    return storage
      ? JSON.parse(storage)
      : <Preferences>{
          countryCode: "US",
          mediaType: "movie",
        };
  } catch (err) {
    throw err;
  }
}
