import Constants from "expo-constants";

import Countries from "../assets/countries-list.json";

export default async function getLocalizedTitles(
  id: string,
  type: MediaTypes
): Promise<LocalizedTitles> {
  if (!id || !type) return {};

  const mediaDetailRes = await fetch(
    `${Constants.expoConfig.extra.apiURL}${type}/${id}?api_key=${Constants.expoConfig.extra.apiKey}`
  );
  const mediaDetails = (await mediaDetailRes.json()) as MediaDetailAPI;
  console.log(
    `${Constants.expoConfig.extra.apiURL}${type}/${id}?api_key=${Constants.expoConfig.extra.apiKey}`
  );
  const defaultTitle = mediaDetails.title ?? mediaDetails.name ?? "";

  const response = await fetch(
    `https://api.themoviedb.org/3/${type}/${id}/translations?api_key=${Constants.expoConfig.extra.apiKey}`
  );
  const { translations }: { translations: MediaLocalizedTitlesAPI[] } =
    await response.json();
  const titles: LocalizedTitles = {};

  Object.entries(Countries).forEach(([countryCode, countryInfo]) => {
    let localized =
      translations?.find((item) => item.iso_3166_1 === countryCode)?.data ?? {};
    let localizedTitle = localized.title ?? localized.name ?? "";
    if (!localizedTitle || localizedTitle === "") {
      console.log(`defaultTitle: ${defaultTitle}`);
      localizedTitle = defaultTitle;
    }
    titles[countryInfo.tag] = localizedTitle;
  });

  return titles;
}
