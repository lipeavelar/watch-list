import { useEffect, useState } from "react";
import { View } from "react-native";

import ComboBox from "../../components/ComboBox";
import MediaList from "../../components/MediaList";
import { useLocalization } from "../../context/LocalizationProvider";
import { usePreferences } from "../../context/PreferencesProvider";
import { useUserInfo } from "../../context/UserInfoProvider";
import { styles } from "./styles";

export default function WatchLater() {
  const { getTranslation } = useLocalization();
  const { preferences, updatePreferences } = usePreferences();
  const { userInfo } = useUserInfo();

  const [medias, setMedias] = useState<MediaOverview[]>([]);

  useEffect(() => {
    setMedias(
      userInfo.watchLater
        .filter((item) => item.type === preferences.mediaType)
        .map((item) => ({
          id: item.id,
          poster: item.poster,
          title: item.title,
        }))
    );
  }, [preferences.mediaType, userInfo.watchLater]);

  return (
    <View style={styles.container}>
      <View style={styles.comboBoxContainer}>
        <ComboBox
          options={[
            {
              label: getTranslation("global.movie"),
              value: "movie",
            },
            {
              label: getTranslation("global.tv"),
              value: "tv",
            },
          ]}
          selectedValue={preferences.mediaType}
          onChange={(type: MediaTypes) =>
            updatePreferences({ mediaType: type })
          }
        />
      </View>
      <MediaList medias={medias} />
    </View>
  );
}
