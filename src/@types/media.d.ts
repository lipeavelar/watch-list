interface Media {
  id: string;
  title: string;
  poster: string;
  description: string;
  releaseDate: string;
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
  localizedTitles?: LocalizedTitles;
  rating?: Rating;
  ratingAdded?: Date;
}

type LocalizedTitles = { [key: string]: string };
type Rating = 0 | 1 | 2 | 3 | 4 | 5;
type WatchListType = "to-see" | "rated";
type MediaTypes = "movie" | "tv";
