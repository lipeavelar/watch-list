import Constants from "expo-constants";
import { Image } from "expo-image";
import { Text } from "react-native";

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
      <Text style={{ ...styles.text, ...styles.title }}>{media.title}</Text>
    </>
  );
}
