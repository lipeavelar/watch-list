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
  poster_path: string;
  overview: string;
  genres: GenreAPI[];
}
