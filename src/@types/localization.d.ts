interface Country {
  code: string;
  name: string;
}

type UpdateCountryFunc = (code: string) => void;
type UpdateLanguageFunc = (code: string) => void;
type GetTranslationFunc = (key: Scope, options?: TranslateOptions) => string;
