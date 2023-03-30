import Constants from "expo-constants";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import ComboBox from "../../components/ComboBox";
import { MediaCard } from "../../components/MediaCard";
import { useLocalization } from "../../utils/LocalizationProvider";
import { styles } from "./styles";

export default function Trending() {
  const [medias, setMedias] = useState<Media[]>([]);
  const [page, setPage] = useState(1);
  const [type, setType] = useState("movie");

  const { locale, getTranslation } = useLocalization();

  useEffect(() => {
    async function requestTrending() {
      try {
        const res = await fetch(
          `${Constants.expoConfig.extra.apiURL}/trending/${type}/week?api_key=${Constants.expoConfig.extra.apiKey}&page=${page}&language=${locale}`
        );
        const trendingMedias = await res.json();

        setMedias([
          ...medias,
          ...trendingMedias.results.map((item: MediaAPI) => ({
            id: item.id,
            title: item.title ?? item.name ?? "",
            poster: item.poster_path,
          })),
        ]);
      } catch (err) {
        console.error(err);
      }
    }

    requestTrending();
  }, [page, type]);

  function handleTypeChange(type: string) {
    setMedias([]);
    setPage(1);
    setType(type);
  }

  return (
    <View style={styles.container}>
      <View style={styles.comboBoxContainer}>
        <ComboBox
          options={[
            {
              label: getTranslation("global.movies"),
              value: "movie",
            },
            {
              label: getTranslation("global.series"),
              value: "tv",
            },
          ]}
          onChange={handleTypeChange}
        />
      </View>
      <FlatList
        numColumns={3}
        data={medias}
        keyExtractor={({ id }) => id}
        onEndReached={() => setPage(page + 1)}
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
