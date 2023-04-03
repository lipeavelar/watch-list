import { Dimensions, FlatList } from "react-native";

import { MediaCard } from "../MediaCard";
import { styles } from "./styles";

interface Props {
  medias: MediaOverview[];
  onUpdate?: () => void;
}

export default function MediaList({ medias, onUpdate }: Props) {
  const { width } = Dimensions.get("window");
  const columnWidth = 120;
  const numColumns = Math.floor(width / columnWidth);

  return (
    <FlatList
      numColumns={numColumns}
      contentContainerStyle={styles.contentListContainer}
      data={medias}
      keyExtractor={({ id }) => id}
      onEndReached={onUpdate}
      onEndReachedThreshold={1}
      renderItem={({ item }) => (
        <MediaCard
          key={item.id}
          id={item.id}
          title={item.title}
          posterURL={item.poster}
        />
      )}
    />
  );
}
