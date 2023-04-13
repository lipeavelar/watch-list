import { useEffect, useState } from "react";
import { View } from "react-native";

import MediaList from "../../components/MediaList";
import MediaTypesBox from "../../components/MediaTypesBox";
import { usePreferences } from "../../contexts/PreferencesProvider";
import { useUserInfo } from "../../contexts/UserInfoProvider";
import { styles } from "./styles";

export default function Rated() {
  const { preferences, filterByMediaTypeFunc } = usePreferences();
  const { userInfo } = useUserInfo();

  const [medias, setMedias] = useState<MediaOverview[]>([]);

  useEffect(() => {
    setMedias(
      userInfo.rated
        .filter(filterByMediaTypeFunc)
        .map((item) => ({
          id: item.id,
          poster: item.poster,
          title: item.title,
        }))
        .reverse()
    );
  }, [preferences.mediaType, userInfo.rated]);

  return (
    <View style={styles.container}>
      <View style={styles.comboBoxContainer}>
        <MediaTypesBox />
      </View>
      <MediaList medias={medias} />
    </View>
  );
}
