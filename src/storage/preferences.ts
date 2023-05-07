import AsyncStorage from "@react-native-async-storage/async-storage";
import { APP_PREFERENCES } from "./storage-config";

let currentPreferences: Preferences = {
  countryCode: "",
  mediaType: "movie",
  languageCode: "",
};

export async function savePreferences(
  preferences: Partial<Preferences>
): Promise<Preferences> {
  currentPreferences = { ...currentPreferences, ...preferences };
  try {
    await AsyncStorage.setItem(
      APP_PREFERENCES,
      JSON.stringify(currentPreferences)
    );
  } catch (err) {
    throw err;
  }
  return currentPreferences;
}

export async function loadPreferences(): Promise<Preferences> {
  try {
    const storage = await AsyncStorage.getItem(APP_PREFERENCES);

    currentPreferences = storage
      ? JSON.parse(storage)
      : <Preferences>{
          countryCode: "US",
          mediaType: "movie",
          languageCode: "US",
        };
    return currentPreferences;
  } catch (err) {
    throw err;
  }
}
