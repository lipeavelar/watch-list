import Constants from "expo-constants";
import { Image } from "expo-image";
import { Text, View } from "react-native";

import WatchLaterButton from "../../components/WatchLaterButton";
import { styles } from "./styles";

interface Props {
  media: Media;
}

export default function DetailsHeader({ media }: Props) {
  return (
    <>
      <Image
        style={styles.cover}
        source={`${Constants.expoConfig.extra.bigPoster}${media.poster}`}
        contentFit="contain"
        transition={1000}
      />
      <View style={styles.titleContainer}>
        <Text style={[styles.text, styles.title]}>{media.title}</Text>
        <WatchLaterButton
          id={media.id}
          poster={media.poster}
          title={media.title}
          style={{ marginLeft: "auto", marginRight: 8 }}
        />
      </View>
    </>
  );
}
