interface Preferences {
  mediaType: MediaTypes;
  countryCode: string;
  languageCode: string;
  ratingSortType: RatingSort;
}

type UpdatePreferencesFunc = (
  preferences: Partial<Preferences>
) => Promise<void>;

type UpdateLangPreferenceFunc = (code: string) => Promise<void>;
type FilterByMediaTypeFunc = (item: SavedMedia) => boolean;
type RatingSort = "sortByDate" | "sortByRating";
