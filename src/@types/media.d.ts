interface Media {
  id: string;
  title: string;
  poster: string;
  description: string;
}

interface MediaDetail {
  id: string;
  title?: string;
  name?: string;
  poster_path: string;
  overview: string;
}

interface ProvidersInfo {
  streaming: string[];
  rent: string[];
  buy: string[];
}
