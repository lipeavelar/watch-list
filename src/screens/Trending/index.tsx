import Constants from "expo-constants";
import { MagnifyingGlass } from "phosphor-react-native";
import { useEffect, useState } from "react";
import {
  Keyboard,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  View,
} from "react-native";

import { IconButton } from "../../components/IconButton";
import Input from "../../components/Input";
import MediaList from "../../components/MediaList";
import MediaTypesBox from "../../components/MediaTypesBox";
import { useLocalization } from "../../contexts/LocalizationProvider";
import { usePreferences } from "../../contexts/PreferencesProvider";
import theme from "../../theme";
import { styles } from "./styles";

// TODO: figure out how to use dates from release date for movies and first air date for series, but this should be on v1.1...
let lastSearch = "";

export default function Trending() {
  const [medias, setMedias] = useState<Media[]>([]);
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");
  const [inSearch, setInSearch] = useState(false);

  const { locale, getTranslation } = useLocalization();
  const { preferences } = usePreferences();

  function getTredingURL(currentPage: number) {
    return `${Constants.expoConfig.extra.apiURL}trending/${preferences.mediaType}/week?api_key=${Constants.expoConfig.extra.apiKey}&page=${currentPage}&language=${locale}`;
  }

  function getSearchingURL(currentPage: number) {
    return `${Constants.expoConfig.extra.apiURL}search/${preferences.mediaType}?api_key=${Constants.expoConfig.extra.apiKey}&page=${currentPage}&query=${lastSearch}&language=${locale}`;
  }

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

  async function requestMedia(url: string, append: boolean) {
    try {
      const res = await fetch(url);
      const returnedMedias = await res.json();

      updateMedia(
        returnedMedias.results.map((item: MediaAPI) => ({
          id: item.id,
          title: item.title ?? item.name ?? "",
          poster: item.poster_path,
        })),
        append
      );
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (page === 1) {
      return;
    }

    if (!inSearch) requestMedia(getTredingURL(page), true);
    else requestMedia(getSearchingURL(page), true);
  }, [page]);

  useEffect(() => {
    setInSearch(false);
    setPage(1);

    requestMedia(getTredingURL(1), false);
  }, [preferences.mediaType]);

  function handleSearch() {
    if (!search) {
      return;
    }

    Keyboard.dismiss();
    setPage(1);

    setInSearch(true);
    lastSearch = search;
    setSearch("");
    requestMedia(getSearchingURL(1), false);
  }

  function handleKeyPress(e: NativeSyntheticEvent<TextInputKeyPressEventData>) {
    if (e.nativeEvent.key === "Enter") {
      handleSearch();
    }
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
            onKeyPress={handleKeyPress}
            onSubmitEditing={handleSearch}
          />
        </View>
        <IconButton
          icon={<MagnifyingGlass size={20} color={theme.COLORS.WHITE} />}
          onPress={handleSearch}
        />
      </View>
      <View style={styles.comboBoxContainer}>
        <MediaTypesBox />
      </View>
      <MediaList medias={medias} onUpdate={() => setPage(page + 1)} />
    </View>
  );
}
