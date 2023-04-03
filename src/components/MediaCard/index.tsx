import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import { Image } from "expo-image";
import { Text, TouchableOpacity, View } from "react-native";

import { useUserInfo } from "../../context/UserInfoProvider";
import { SelectButton } from "../SelectButton";
import { styles } from "./styles";

interface Props {
  id: string;
  posterURL: string;
  title: string;
}

export function MediaCard({ posterURL, title, id }: Props) {
  const navigation = useNavigation();
  const { userInfo, updateWatchLater } = useUserInfo();
  const onWatchList = userInfo.watchLater.findIndex((i) => i.id === id) > -1;

  function handleDetails() {
    navigation.navigate("details", {
      id,
    });
  }

  function handleWatchLater(selected: boolean) {
    async function updateList() {
      try {
        const updateItem: SavedMedia = {
          id,
          poster: posterURL,
          title,
        };
        await updateWatchLater(updateItem, action);
      } catch (err) {
        console.log(err);
      }
    }
    const action: WatchListAction = selected ? "add" : "remove";
    updateList();
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
          <SelectButton onPress={handleWatchLater} selected={onWatchList} />
        </View>
      </View>
    </TouchableOpacity>
  );
}
