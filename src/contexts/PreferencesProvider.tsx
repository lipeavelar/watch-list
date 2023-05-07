import { createContext, useContext, useEffect, useState } from "react";

import { loadPreferences, savePreferences } from "../storage/preferences";
import { useLocalization } from "./LocalizationProvider";

interface Props {
  children: React.ReactNode;
}

interface preferencesCtx {
  preferences: Preferences;
  updatePreferences: UpdatePreferencesFunc;
  updateLangPreferences: UpdateLangPreferenceFunc;
  filterByMediaTypeFunc: FilterByMediaTypeFunc;
}

const PreferencesContext = createContext<preferencesCtx>({
  preferences: {
    countryCode: "US",
    mediaType: "movie",
    languageCode: "US",
    ratingSortType: "sortByDate",
  },
  updatePreferences: async () => {},
  updateLangPreferences: async () => {},
  filterByMediaTypeFunc: () => false,
});

export function PreferencesProvider({ children }: Props) {
  const [preferences, setPreferences] = useState<Preferences>({
    countryCode: "US",
    mediaType: "movie",
    languageCode: "US",
    ratingSortType: "sortByDate",
  });

  const { updateCountry, updateLanguage } = useLocalization();

  useEffect(() => {
    async function loadPrefs() {
      try {
        const loadedPreferences = await loadPreferences();
        if (!loadedPreferences.ratingSortType) {
          loadedPreferences.ratingSortType = "sortByDate";
        }
        setPreferences(loadedPreferences);
        updateCountry(loadedPreferences.countryCode);
        updateLangPreferences(loadedPreferences.languageCode);
      } catch (err) {
        console.error(err);
      }
    }
    loadPrefs();
    updateLanguage(preferences.languageCode);
  }, []);

  useEffect(() => {
    updateCountry(preferences.countryCode);
  }, [preferences.countryCode]);

  async function updateLangPreferences(code: string): Promise<void> {
    try {
      updateLanguage(code);
      await updatePreferences({
        languageCode: code,
      });
    } catch (err) {
      throw err;
    }
  }

  async function updatePreferences(
    newPreferences: Partial<Preferences>
  ): Promise<void> {
    try {
      const preferencesToUpdate = await savePreferences(newPreferences);
      setPreferences(preferencesToUpdate);
    } catch (err) {
      throw err;
    }
  }

  function filterByMediaTypeFunc(item: SavedMedia): boolean {
    return item.type === preferences.mediaType;
  }

  const value = {
    preferences,
    updatePreferences,
    updateLangPreferences,
    filterByMediaTypeFunc,
  };

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
}

export const usePreferences = () => useContext(PreferencesContext);
