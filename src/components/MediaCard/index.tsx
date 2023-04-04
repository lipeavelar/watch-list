import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import { Image } from "expo-image";
import { Text, TouchableOpacity, View } from "react-native";

import { Check, Plus } from "phosphor-react-native";
import { useMemo } from "react";
import { usePreferences } from "../../context/PreferencesProvider";
import { useUserInfo } from "../../context/UserInfoProvider";
import theme from "../../theme";
import { styles } from "./styles";

interface Props {
  id: string;
  posterURL: string;
  title: string;
}

export function MediaCard({ posterURL, title, id }: Props) {
  const navigation = useNavigation();
  const { userInfo, updateWatch } = useUserInfo();
  const { preferences } = usePreferences();

  const onWatchList = useMemo(() => {
    return userInfo.watchLater.findIndex((i) => i.id === id) > -1;
  }, [userInfo.watchLater]);

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
          type: preferences.mediaType,
        };
        await updateWatch("to-see", updateItem, action);
      } catch (err) {
        console.error(err);
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
          <TouchableOpacity onPress={() => handleWatchLater(!onWatchList)}>
            {onWatchList ? (
              <Check size={20} color={theme.COLORS.WHITE} />
            ) : (
              <Plus size={20} color={theme.COLORS.WHITE} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}
