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

interface SavedMedia {
  id: string;
  poster: string;
  title: string;
}

type MediaTypes = "movie" | "tv";
