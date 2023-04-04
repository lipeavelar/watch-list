interface Media {
  id: string;
  title: string;
  poster: string;
  description: string;
  genres: string[];
}

interface MediaOverview {
  id: string;
  title: string;
  poster: string;
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
  type: MediaTypes;
  rating?: Rating;
}

type Rating = 1 | 2 | 3 | 4 | 5;
type WatchListType = "to-see" | "seen";
type MediaTypes = "movie" | "tv";
