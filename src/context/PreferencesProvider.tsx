import { createContext, useContext, useEffect, useState } from "react";

import { loadPreferences, savePreferences } from "../storage/preferences";
import { useLocalization } from "./LocalizationProvider";

interface Props {
  children: React.ReactNode;
}

interface preferencesCtx {
  preferences: Preferences;
  updatePreferences: UpdatePreferencesFunc;
}

const PreferencesContext = createContext<preferencesCtx>({
  preferences: {
    countryCode: "US",
    mediaType: "movie",
  },
  updatePreferences: async () => {},
});

export function PreferencesProvider({ children }: Props) {
  const [preferences, setPreferences] = useState<Preferences>({
    countryCode: "US",
    mediaType: "movie",
  });

  const { updateCountry } = useLocalization();

  useEffect(() => {
    async function loadPrefs() {
      try {
        const loadedPreferences = await loadPreferences();
        setPreferences(loadedPreferences);
        updateCountry(loadedPreferences.countryCode);
      } catch (err) {
        console.error(err);
      }
    }
    loadPrefs();
  }, []);

  useEffect(() => {
    updateCountry(preferences.countryCode);
  }, [preferences.countryCode]);

  async function updatePreferences(
    newPreferences: Partial<Preferences>
  ): Promise<void> {
    const preferencesToUpdate = {
      ...preferences,
      ...newPreferences,
    };

    try {
      await savePreferences(preferencesToUpdate);
    } catch (err) {
      throw err;
    } finally {
      setPreferences(preferencesToUpdate);
    }
  }

  const value = {
    preferences,
    updatePreferences,
  };

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
}

export const usePreferences = () => useContext(PreferencesContext);
