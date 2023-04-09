import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import { Image } from "expo-image";
import { Text, TouchableOpacity, View } from "react-native";

import WatchLaterButton from "../WatchLaterButton";
import { styles } from "./styles";

interface Props {
  id: string;
  posterURL: string;
  title: string;
}

export function MediaCard({ posterURL, title, id }: Props) {
  const navigation = useNavigation();

  function handleDetails() {
    navigation.navigate("details", {
      id,
    });
  }

  return (
    <TouchableOpacity onPress={handleDetails}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={`${Constants.expoConfig.extra.miniPoster}${posterURL}`}
          contentFit="cover"
          transition={1000}
        />
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          <WatchLaterButton id={id} poster={posterURL} title={title} />
        </View>
      </View>
    </TouchableOpacity>
  );
}
