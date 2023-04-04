import Constants from "expo-constants";
import { MagnifyingGlass } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { Alert, Keyboard, View } from "react-native";

import { IconButton } from "../../components/IconButton";
import Input from "../../components/Input";
import MediaList from "../../components/MediaList";
import MediaTypesBox from "../../components/MediaTypesBox";
import { useLocalization } from "../../context/LocalizationProvider";
import { usePreferences } from "../../context/PreferencesProvider";
import theme from "../../theme";
import { styles } from "./styles";

// TODO: figure out how to use dates from release date for movies and first air date for series, but this should be on v1.1...

export default function Trending() {
  const [medias, setMedias] = useState<Media[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [inSearch, setInSearch] = useState(false);

  const { locale, getTranslation } = useLocalization();
  const { preferences } = usePreferences();

  function updateMedia(newMedia: Media[], append: boolean) {
    const updateMedias: Media[] = [];
    if (append) {
      updateMedias.push(...medias);
    }
    const newMediaFiltered = newMedia.filter(
      (item) => item.description || item.poster
    );
    setMedias([...updateMedias, ...newMediaFiltered]);
  }

  useEffect(() => {
    async function requestTrending() {
      try {
        const res = await fetch(
          `${Constants.expoConfig.extra.apiURL}/trending/${preferences.mediaType}/week?api_key=${Constants.expoConfig.extra.apiKey}&page=${page}&language=${locale}`
        );
        const trendingMedias = await res.json();

        updateMedia(
          trendingMedias.results.map((item: MediaAPI) => ({
            id: item.id,
            title: item.title ?? item.name ?? "",
            poster: item.poster_path,
          })),
          true
        );
      } catch (err) {
        Alert.alert(err);
      }
    }

    if (!inSearch) requestTrending();
  }, [page, preferences.mediaType]);

  function handleTypeChange() {
    setMedias([]);
    setPage(1);
    setInSearch(false);
  }

  function handleSearch() {
    async function requestSearch(searchText: string) {
      try {
        const res = await fetch(
          `${Constants.expoConfig.extra.apiURL}search/${preferences.mediaType}?api_key=${Constants.expoConfig.extra.apiKey}&page=1&query=${searchText}&language=${locale}`
        );
        const searchedMedias = await res.json();

        updateMedia(
          searchedMedias.results.map((item: MediaAPI) => ({
            id: item.id,
            title: item.title ?? item.name ?? "",
            poster: item.poster_path,
          })),
          false
        );
      } catch (err) {
        Alert.alert(err);
      }
    }
    Keyboard.dismiss();
    setInSearch(true);
    requestSearch(search);
    setSearch("");
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Input
            placeholder={getTranslation("trending.search", {
              type: getTranslation(`global.${preferences.mediaType}`),
            })}
            value={search}
            onChangeText={setSearch}
          />
        </View>
        <IconButton
          icon={<MagnifyingGlass size={20} color={theme.COLORS.WHITE} />}
          onPress={handleSearch}
        />
      </View>
      <View style={styles.comboBoxContainer}>
        <MediaTypesBox onUpdate={handleTypeChange} />
      </View>
      <MediaList medias={medias} onUpdate={() => setPage(page + 1)} />
    </View>
  );
}
