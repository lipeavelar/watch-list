import { Check, Plus } from "phosphor-react-native";
import { useMemo } from "react";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";

import { usePreferences } from "../../contexts/PreferencesProvider";
import { useUserInfo } from "../../contexts/UserInfoProvider";
import theme from "../../theme";

interface Props {
  id: string;
  poster: string;
  title: string;
  style?: StyleProp<ViewStyle>;
}

export default function WatchLaterButton({ poster, title, id, style }: Props) {
  const { userInfo, updateWatch } = useUserInfo();
  const { preferences } = usePreferences();

  const onWatchList = useMemo(
    () => userInfo.watchLater.findIndex((i) => i.id === id) > -1,
    [userInfo.watchLater]
  );

  function handleWatchLater(selected: boolean) {
    async function updateList() {
      try {
        const updateItem: SavedMedia = {
          id,
          poster,
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
    <TouchableOpacity
      onPress={() => handleWatchLater(!onWatchList)}
      style={style}
    >
      {onWatchList ? (
        <Check size={20} color={theme.COLORS.WHITE} />
      ) : (
        <Plus size={20} color={theme.COLORS.WHITE} />
      )}
    </TouchableOpacity>
  );
}
