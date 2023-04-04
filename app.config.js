export default ({config}) => ({
  ...config,
  extra: {
    apiKey: process.env.API_KEY,
    logo: "https://image.tmdb.org/t/p/w92",
    miniPoster: "https://image.tmdb.org/t/p/w185",
    bigPoster: "https://image.tmdb.org/t/p/w500",
    apiURL: "https://api.themoviedb.org/3/",
    "eas": {
      "projectId": process.env.EAS_PROJECT_ID
    }
  }
})
