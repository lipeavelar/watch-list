interface Media {
  id: string;
  title: string;
  poster: string;
  description: string;
  genres: string[];
}

interface ProvidersInfo {
  streaming: string[];
  rent: string[];
  buy: string[];
}
