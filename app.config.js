export default ({config}) => ({
  ...config,
  extra: {
    apiKey: process.env.API_KEY,
    logo: "https://image.tmdb.org/t/p/w92",
    miniPoster: "https://image.tmdb.org/t/p/w185",
    bigPoster: "https://image.tmdb.org/t/p/w500",
    apiURL: "https://api.themoviedb.org/3/",
    "eas": {
      "projectId": "81a7c325-71e3-443d-97fc-7f0c19b6e0be"
    }
  }
})
