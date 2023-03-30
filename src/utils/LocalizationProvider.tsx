import { getLocales } from "expo-localization";
import { I18n, Scope, TranslateOptions } from "i18n-js";
import { createContext, useContext, useEffect, useState } from "react";

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

  const countryList = Object.entries(Countries).map(
    ([code, translationKey]) => ({
      code,
      name: getTranslation(`countries.${Countries[code]}`),
    })
  );

  const [country, setCountry] = useState({
    code: "US",
    name: getTranslation(`countries.${Countries.US}`),
  });

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
        name: getTranslation(`countries.${Countries[code]}`),
      });
    }
  }

  function getTranslation(key: Scope, options?: TranslateOptions): string {
    return i18n.t(key, options);
  }

  const value = {
    locale: i18n.locale,
    country,
    countryList,
    updateCountry,
    getTranslation,
  };

  return (
    <LocalizationContext.Provider value={value}>
      {children}
    </LocalizationContext.Provider>
  );
}

export const useLocalization = () => useContext(LocalizationContext);
