import { getLocales } from "expo-localization";
import { I18n, Scope, TranslateOptions } from "i18n-js";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import Countries from "../assets/countries-list.json";
import enUS from "../assets/lang/en-US.json";
import ptBR from "../assets/lang/pt-BR.json";

interface Props {
  children: React.ReactNode;
}

interface localizationCtx {
  locale: string;
  country: Country;
  countryList: Country[];
  updateCountry: UpdateCountryFunc;
  updateLanguage: UpdateLanguageFunc;
  getTranslation: GetTranslationFunc;
}

const LocalizationContext = createContext<localizationCtx>({
  locale: "en-US",
  country: {
    code: "",
    name: "",
  },
  countryList: [],
  updateCountry: () => "",
  updateLanguage: () => "",
  getTranslation: () => "",
});

export function LocalizationProvider({ children }: Props) {
  const i18n = new I18n({
    ...enUS,
    ...ptBR,
  });

  const [country, setCountry] = useState({
    code: "US",
    name: getTranslation(`countries.${Countries.US.name}`),
  });

  const [locale, setLocale] = useState(getLocales()[0].languageTag);

  i18n.locale = locale;
  i18n.enableFallback = true;
  i18n.defaultLocale = "en-US";

  const countryList = useMemo(
    () =>
      Object.keys(Countries).map((code) => ({
        code,
        name: getTranslation(`countries.${Countries[code].name}`),
      })),
    [i18n.locale]
  );

  useEffect(() => {
    const countryCode =
      i18n.locale.indexOf("-") > -1
        ? i18n.locale.substring(i18n.locale.indexOf("-") + 1)
        : "US";

    updateCountry(countryCode);
  }, []);

  function updateCountry(code: string) {
    if (Object.keys(Countries).find((k) => k === code)) {
      setCountry({
        code,
        name: getTranslation(`countries.${Countries[code].name}`),
      });
    }
  }

  function updateLanguage(code: string) {
    if (!code || !(code in Countries)) {
      return "en-US";
    }
    setLocale(Countries[code].tag);
    i18n.locale = Countries[code].tag;
  }

  function getTranslation(key: Scope, options?: TranslateOptions): string {
    return i18n.t(key, options);
  }

  const value = {
    locale,
    country,
    countryList,
    updateCountry,
    updateLanguage,
    getTranslation,
  };

  return (
    <LocalizationContext.Provider value={value}>
      {children}
    </LocalizationContext.Provider>
  );
}

export const useLocalization = () => useContext(LocalizationContext);
