import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import { Image } from "expo-image";
import { Text, TouchableOpacity, View } from "react-native";

import { SelectButton } from "../SelectButton";
import { styles } from "./styles";

interface Props {
  id: string;
  posterURL: string;
  title: string;
  type: string;
}

export function MediaCard({ posterURL, title, id, type }: Props) {
  const navigation = useNavigation();

  function handleDetails() {
    navigation.navigate("details", {
      id,
      type,
    });
  }

  function handlePreference() {
    console.log(id);
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
          <SelectButton onPress={handlePreference} selected={false} />
        </View>
      </View>
    </TouchableOpacity>
  );
}
