interface Preferences {
  mediaType: MediaTypes;
  countryCode: string;
}

type UpdatePreferencesFunc = (
  preferences: Partial<Preferences>
) => Promise<void>;

type FilterByMediaTypeFunc = (item: SavedMedia) => boolean;
