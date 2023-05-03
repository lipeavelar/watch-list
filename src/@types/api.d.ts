interface MediaProvidersAPI {
  results: {
    [key: string]: {
      flatrate?: MediaProviderAPI[];
      rent?: MediaProviderAPI[];
      buy?: MediaProviderAPI[];
    };
  };
}

interface MediaProviderAPI {
  provider_id: string;
}

interface GenreAPI {
  id: string;
  name: string;
}

interface SeasonAPI {
  season_number: number;
  air_date: string;
}

interface MediaAPI {
  id: string;
  title?: string;
  name?: string;
  poster_path: string;
}

interface MediaDetailAPI {
  id: string;
  title?: string;
  name?: string;
  release_date?: string;
  seasons?: SeasonAPI[];
  poster_path: string;
  overview: string;
  genres: GenreAPI[];
}

interface MediaLocalizedTitlesAPI {
  iso_3166_1: string;
  data: {
    title?: string;
    name?: string;
  };
}
