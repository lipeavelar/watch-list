import { useEffect, useState } from "react";
import { View } from "react-native";

import MediaList from "../../components/MediaList";
import MediaTypesBox from "../../components/MediaTypesBox";
import { usePreferences } from "../../contexts/PreferencesProvider";
import { useUserInfo } from "../../contexts/UserInfoProvider";
import SortRating from "./sort-rating";
import { styles } from "./styles";

export default function Rated() {
  const { preferences, filterByMediaTypeFunc } = usePreferences();
  const { userInfo } = useUserInfo();

  const [medias, setMedias] = useState<MediaOverview[]>([]);

  const sortRatingFunctions = {
    sortByDate: (a: SavedMedia, b: SavedMedia) =>
      b.ratingAdded?.getTime() - a.ratingAdded?.getTime(),
    sortByRating: (a: SavedMedia, b: SavedMedia) =>
      b.rating - a.rating === 0
        ? b.ratingAdded?.getTime() - a.ratingAdded?.getTime()
        : b.rating - a.rating,
  };

  useEffect(() => {
    const newMedia = userInfo.rated
      .filter(filterByMediaTypeFunc)
      .map(
        (item) =>
          ({
            id: item.id,
            poster: item.poster,
            title: item.title,
            rating: item.rating,
            ratingAdded: item.ratingAdded,
          } as SavedMedia)
      )
      .sort(sortRatingFunctions[preferences.ratingSortType]);
    setMedias(newMedia);
  }, [preferences.mediaType, userInfo.rated, preferences.ratingSortType]);

  return (
    <View style={styles.container}>
      <View style={styles.comboBoxContainer}>
        <MediaTypesBox />
        <SortRating />
      </View>
      <MediaList medias={medias} />
    </View>
  );
}
