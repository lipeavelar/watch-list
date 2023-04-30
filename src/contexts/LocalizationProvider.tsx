import { getLocales } from "expo-localization";
import { I18n, Scope, TranslateOptions } from "i18n-js";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import Countries from "../assets/countries-list.json";
import en from "../assets/lang/en-US.json";
import ptBR from "../assets/lang/pt-BR.json";

interface Props {
  children: React.ReactNode;
}

interface localizationCtx {
  locale: string;
  country: Country;
  countryList: Country[];
  updateCountry: UpdateCountryFunc;
  updateLanguage: UpdateCountryFunc;
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
    ...en,
    ...ptBR,
  });

  i18n.locale = getLocales()[0].languageTag;
  i18n.enableFallback = true;
  i18n.defaultLocale = "en-US";

  const [country, setCountry] = useState({
    code: "US",
    name: getTranslation(`countries.${Countries.US.name}`),
  });

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
    i18n.locale = Countries[code].tag;
  }

  function getTranslation(key: Scope, options?: TranslateOptions): string {
    const option = {
      ...options,
      locale: i18n.locale,
    };
    return i18n.t(key, option);
  }

  const value = {
    locale: i18n.locale,
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
