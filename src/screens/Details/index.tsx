import { useRoute } from "@react-navigation/native";
import Constants from "expo-constants";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import LabeledText from "../../components/LabeledText";
import { Loading } from "../../components/Loading";
import { useLocalization } from "../../utils/LocalizationProvider";
import DetailsHeader from "./details-header";
import ProvidersContainer from "./providers-container";
import { styles } from "./styles";

interface Params {
  id: string;
  type: string;
}

export default function Details() {
  const [media, setMedia] = useState<Media | null>(null);
  const [loading, setLoading] = useState(true);

  const route = useRoute();
  const { id, type } = route.params as Params;

  const { locale, getTranslation } = useLocalization();

  useEffect(() => {
    async function requestDetails() {
      try {
        const mediaDetailRes = await fetch(
          `${Constants.expoConfig.extra.apiURL}/${type}/${id}?api_key=${Constants.expoConfig.extra.apiKey}&language=${locale}`
        );
        const mediaDetail = (await mediaDetailRes.json()) as MediaDetailAPI;

        setMedia({
          id: mediaDetail.id,
          title: mediaDetail.title ?? mediaDetail.name ?? "",
          poster: mediaDetail.poster_path,
          description: mediaDetail.overview,
          genres: mediaDetail.genres.map((genre) => genre.name),
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    setLoading(true);
    requestDetails();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <View style={styles.container}>
          <DetailsHeader media={media} />
          <ScrollView style={styles.details}>
            <LabeledText label={getTranslation("details.genres")}>
              {media.genres.join(", ")}
            </LabeledText>
            <LabeledText label={getTranslation("details.description")}>
              {media.description}
            </LabeledText>
            <ProvidersContainer id={id} type={type} />
          </ScrollView>
        </View>
      )}
    </>
  );
}
