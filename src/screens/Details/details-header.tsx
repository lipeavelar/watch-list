import Constants from "expo-constants";
import { Image } from "expo-image";
import { Share, Text, TouchableOpacity, View } from "react-native";

import { ShareNetwork } from "phosphor-react-native";
import WatchLaterButton from "../../components/WatchLaterButton";
import { useLocalization } from "../../contexts/LocalizationProvider";
import { usePreferences } from "../../contexts/PreferencesProvider";
import theme from "../../theme";
import { styles } from "./styles";

interface Props {
  media: Media;
}

export default function DetailsHeader({ media }: Props) {
  const { preferences } = usePreferences();
  const { getTranslation } = useLocalization();

  function handleShare() {
    Share.share({
      message: getTranslation("global.shareMedia", {
        mediaTitle: media.title,
        mediaUrl: `https://www.themoviedb.org/${preferences.mediaType}/${media.id}`,
      }),
      title: getTranslation("global.shareMediaTitle"),
    });
  }

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
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleShare}>
            <ShareNetwork size={20} color={theme.COLORS.WHITE} />
          </TouchableOpacity>
          <WatchLaterButton
            id={media.id}
            poster={media.poster}
            title={media.title}
            style={{ marginLeft: 8 }}
          />
        </View>
      </View>
    </>
  );
}
