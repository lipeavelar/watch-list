import Constants from "expo-constants";
import { MagnifyingGlass } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { Dimensions, FlatList, Keyboard, View } from "react-native";
import ComboBox from "../../components/ComboBox";
import { IconButton } from "../../components/IconButton";
import Input from "../../components/Input";
import { MediaCard } from "../../components/MediaCard";
import theme from "../../theme";
import { useLocalization } from "../../utils/LocalizationProvider";
import { styles } from "./styles";

// TODO: figure out how to use dates from release date for movies and first air date for series, but this should be on v1.1...

export default function Trending() {
  const [medias, setMedias] = useState<Media[]>([]);
  const [page, setPage] = useState(1);
  const [type, setType] = useState("movie");
  const [search, setSearch] = useState("");
  const [inSearch, setInSearch] = useState(false);

  const { locale, getTranslation } = useLocalization();

  const { width } = Dimensions.get("window");
  const columnWidth = 120; // Change this to your desired column width
  const numColumns = Math.floor(width / columnWidth);
  console.log(numColumns);

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
          `${Constants.expoConfig.extra.apiURL}/trending/${type}/week?api_key=${Constants.expoConfig.extra.apiKey}&page=${page}&language=${locale}`
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
        console.error(err);
      }
    }

    if (!inSearch) requestTrending();
  }, [page, type]);

  function handleTypeChange(type: string) {
    setMedias([]);
    setPage(1);
    setType(type);
    setInSearch(false);
  }

  function handleSearch() {
    async function requestSearch(searchText: string) {
      try {
        const res = await fetch(
          `${Constants.expoConfig.extra.apiURL}search/${type}?api_key=${Constants.expoConfig.extra.apiKey}&page=1&query=${searchText}&language=${locale}`
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
        console.error(err);
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
              type: getTranslation(`global.${type}`),
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
        <ComboBox
          options={[
            {
              label: getTranslation("global.movie"),
              value: "movie",
            },
            {
              label: getTranslation("global.tv"),
              value: "tv",
            },
          ]}
          onChange={handleTypeChange}
        />
      </View>
      <FlatList
        numColumns={numColumns}
        contentContainerStyle={styles.contentListContainer}
        data={medias}
        keyExtractor={({ id }) => id}
        onEndReached={() => {}}
        onEndReachedThreshold={1}
        renderItem={({ item }) => (
          <MediaCard
            key={item.id}
            id={item.id}
            title={item.title}
            posterURL={item.poster}
            type={type}
          />
        )}
      />
    </View>
  );
}
