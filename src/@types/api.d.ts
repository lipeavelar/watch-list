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

interface MediaAPI {
  id: string;
  title?: string;
  name?: string;
  poster_path: string;
}
